"use client";

import React, { useState, useEffect, useRef } from 'react';
import TurndownService from 'turndown';
import { FONT_STYLES, TIMING, SPACING } from '@/constants/theme';

interface TextSelectionToolbarProps {
  isDarkMode: boolean;
  children: React.ReactNode;
  onAskWrite?: (selectedText: string) => void;
  onMoveToCanvas?: (selectedText: string, markdownText?: string) => void;
}

export default function TextSelectionToolbar({ 
  isDarkMode, 
  children,
  onAskWrite, 
  onMoveToCanvas 
}: TextSelectionToolbarProps) {
  const [selectedText, setSelectedText] = useState('');
  const [selectedMarkdown, setSelectedMarkdown] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turndownRef = useRef<TurndownService | null>(null);
  
  // Initialize Turndown service
  useEffect(() => {
    turndownRef.current = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    
    // Add custom rules for better conversion
    turndownRef.current.addRule('preserveLineBreaks', {
      filter: 'br',
      replacement: () => '  \n'
    });
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      // Clear any existing timeout
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setShowToolbar(false);
        setSelectedText('');
        setSelectedMarkdown('');
        return;
      }

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();
      
      if (!text || text.length === 0) {
        setShowToolbar(false);
        setSelectedText('');
        setSelectedMarkdown('');
        return;
      }

      // Check if selection is within our container
      if (containerRef.current && !containerRef.current.contains(range.commonAncestorContainer)) {
        setShowToolbar(false);
        setSelectedText('');
        setSelectedMarkdown('');
        return;
      }

      setSelectedText(text);
      
      // Extract HTML from selection and convert to Markdown
      try {
        const clonedSelection = range.cloneContents();
        const div = document.createElement('div');
        div.appendChild(clonedSelection);
        
        // Convert HTML to Markdown
        if (turndownRef.current) {
          const markdown = turndownRef.current.turndown(div.innerHTML);
          setSelectedMarkdown(markdown);
        } else {
          setSelectedMarkdown(text);
        }
      } catch (error) {
        console.error('Error converting selection to markdown:', error);
        setSelectedMarkdown(text);
      }
      
      // Calculate position for toolbar
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (containerRect) {
        const toolbarX = rect.left + (rect.width / 2) - containerRect.left;
        const toolbarY = rect.top - containerRect.top - SPACING.toolbarOffset; // offset above selection
        
        setToolbarPosition({ x: toolbarX, y: Math.max(0, toolbarY) });
        
        // Add delay before showing toolbar
        delayTimeoutRef.current = setTimeout(() => {
          setShowToolbar(true);
        }, TIMING.delay.toolbarShow);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        // Clear timeout if user clicks outside
        if (delayTimeoutRef.current) {
          clearTimeout(delayTimeoutRef.current);
          delayTimeoutRef.current = null;
        }
        
        const selection = window.getSelection();
        if (!selection || selection.toString().trim().length === 0) {
          setShowToolbar(false);
          setSelectedText('');
          setSelectedMarkdown('');
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clear timeout on cleanup
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
      
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAskWrite = () => {
    // Clear timeout when button is clicked
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    
    if (onAskWrite && selectedText) {
      onAskWrite(selectedText);
    }
    setShowToolbar(false);
    setSelectedText('');
    setSelectedMarkdown('');
    window.getSelection()?.removeAllRanges();
  };

  const handleMoveToCanvas = () => {
    // Clear timeout when button is clicked
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    
    if (onMoveToCanvas && selectedText) {
      // Use the converted markdown or fall back to plain text
      onMoveToCanvas(selectedText, selectedMarkdown || selectedText);
    }
    setShowToolbar(false);
    setSelectedText('');
    setSelectedMarkdown('');
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div ref={containerRef} className="relative">
      {children}
      
      {showToolbar && (
        <div
          ref={toolbarRef}
          className={`absolute z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl border-2 transition-all duration-200 backdrop-blur-xl ${
            isDarkMode 
              ? 'bg-zinc-900/95 border-white/20 shadow-black/50' 
              : 'bg-white/95 border-amber-200/60 shadow-black/20'
          }`}
          style={{
            left: `${toolbarPosition.x}px`,
            top: `${toolbarPosition.y}px`,
            transform: 'translateX(-50%)',
            fontFamily: FONT_STYLES.fontFamily,
            fontWeight: FONT_STYLES.fontWeight.medium,
          }}
        >
          <button
            onClick={handleAskWrite}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/20 shadow-white/10' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200/50 shadow-amber-200/30'
            }`}
            style={{ fontWeight: FONT_STYLES.fontWeight.medium }}
          >
            Ask/write
          </button>
          
          <button
            onClick={handleMoveToCanvas}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/20 shadow-white/10' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200/50 shadow-amber-200/30'
            }`}
            style={{ fontWeight: FONT_STYLES.fontWeight.medium }}
          >
            Move to canvas
          </button>
        </div>
      )}
    </div>
  );
}