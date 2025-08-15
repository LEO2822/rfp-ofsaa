"use client";

import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { useHistory } from "@/hooks/useHistory";
import { FONT_STYLES, TIMING } from "@/constants/theme";

interface MarkdownCanvasProps {
  isDarkMode: boolean;
  selectedTextToAdd?: string;
  onStateChange?: (canUndo: boolean, canRedo: boolean) => void;
}

interface HistoryEntry {
  value: string;
  timestamp: number;
  id: string;
}

export interface MarkdownCanvasRef {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  getHistory: () => HistoryEntry[];
  goToVersion: (index: number) => void;
}

const MarkdownCanvas = forwardRef<MarkdownCanvasRef, MarkdownCanvasProps>(
  ({ isDarkMode, selectedTextToAdd, onStateChange }, ref) => {
  const history = useHistory<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useImperativeHandle(ref, () => ({
    undo: history.undo,
    redo: history.redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
    getHistory: history.getHistory,
    goToVersion: history.goToVersion
  }));
  
  // Notify parent of state changes
  useEffect(() => {
    onStateChange?.(history.canUndo, history.canRedo);
  }, [history.canUndo, history.canRedo, onStateChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    history.set(text);
    
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Only switch to preview mode after user stops typing
    if (text.trim()) {
      debounceTimeoutRef.current = setTimeout(() => {
        setIsEditMode(false);
      }, TIMING.delay.autoPreview);
    }
  }, [history]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Press Escape to preview immediately
    if (e.key === 'Escape' && history.value.trim()) {
      e.preventDefault();
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      setIsEditMode(false);
    }
    // Press Ctrl/Cmd + Enter to preview immediately (keep Tab for normal tab behavior)
    else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && history.value.trim()) {
      e.preventDefault();
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      setIsEditMode(false);
    }
    // Let Enter key work normally for new lines - don't prevent default
  }, [history.value]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text/plain");
    if (text && text.trim().length > 0) {
      history.set(text);
      // Clear any pending timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      // Show preview immediately for pasted content
      setTimeout(() => {
        setIsEditMode(false);
      }, TIMING.animation.fast);
    }
  }, [history]);

  const handleClick = useCallback(() => {
    // Switch to edit mode when clicked
    setIsEditMode(true);
    // Clear any pending timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  }, []);

  useEffect(() => {
    // Focus textarea when in edit mode
    if (isEditMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditMode]);

  // Handle adding selected text to canvas
  useEffect(() => {
    if (selectedTextToAdd && selectedTextToAdd.trim()) {
      const textToAdd = selectedTextToAdd.trim();
      
      const separator = history.value.trim() ? '\n\n' : '';
      const newContent = history.value + separator + textToAdd;
      history.set(newContent);
      
      // Focus the textarea after updating content
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Set cursor to end of text
          const length = newContent.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, TIMING.animation.fast);
      
      setIsEditMode(true);
      
      // Clear any pending timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      // Automatically switch to preview mode after adding text
      setTimeout(() => {
        setIsEditMode(false);
      }, TIMING.animation.slow);
    }
  }, [selectedTextToAdd, history]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  if (!isEditMode && history.value.trim()) {
    // Show rendered markdown
    return (
      <div
        onClick={handleClick}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 cursor-text"
        style={{
          fontFamily: FONT_STYLES.fontFamily,
          fontWeight: FONT_STYLES.fontWeight.normal,
          fontSize: FONT_STYLES.fontSize.base,
          lineHeight: FONT_STYLES.lineHeight.relaxed,
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
          maxWidth: "100%",
        }}
      >
        <div 
          className="prose prose-sm max-w-none overflow-hidden"
          style={{ 
            wordWrap: "break-word", 
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          <MarkdownRenderer content={history.value} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  // Show textarea for editing
  return (
    <textarea
      ref={textareaRef}
      value={history.value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className={`flex-1 w-full resize-none bg-transparent p-4 focus:outline-none overflow-y-auto ${
        isDarkMode 
          ? 'text-zinc-200 placeholder:text-zinc-400/30' 
          : 'text-gray-900 placeholder:text-gray-500/50'
      }`}
      placeholder="Type or paste Markdown here..."
      style={{
        fontFamily: FONT_STYLES.fontFamily,
        fontWeight: FONT_STYLES.fontWeight.normal,
        fontSize: FONT_STYLES.fontSize.base,
        lineHeight: FONT_STYLES.lineHeight.relaxed,
        wordWrap: "break-word",
        overflowWrap: "break-word",
        minHeight: 0,
      }}
    />
  );
});

MarkdownCanvas.displayName = 'MarkdownCanvas';

export default MarkdownCanvas;