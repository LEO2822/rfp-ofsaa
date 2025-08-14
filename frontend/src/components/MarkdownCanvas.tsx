"use client";

import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { useHistory } from "@/hooks/useHistory";

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
    
    // Only switch to preview mode after user stops typing for 1.5 seconds
    if (text.trim()) {
      debounceTimeoutRef.current = setTimeout(() => {
        setIsEditMode(false);
      }, 1500);
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
      }, 100);
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
      }, 100);
      
      setIsEditMode(true);
      
      // Clear any pending timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      // Automatically switch to preview mode after adding text
      setTimeout(() => {
        setIsEditMode(false);
      }, 800);
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
          fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "1.6",
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSanitize,
              rehypeHighlight,
            ]}
          components={{
            a: ({ href, children, ...props }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                {...props}
              >
                {children}
              </a>
            ),
            img: ({ src, alt, ...props }) => {
              if (!src) return null;
              // Use Next.js Image for external URLs and regular img for data URLs/blobs
              if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('/'))) {
                return (
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={800}
                    height={600}
                    className="max-w-full h-auto rounded-md"
                    style={{ width: 'auto', height: 'auto' }}
                    unoptimized
                  />
                );
              }
              // Fallback to regular img for data URLs and other cases
              return (
                <img
                  src={typeof src === 'string' ? src : ''}
                  alt={alt || ""}
                  className="max-w-full h-auto rounded-md"
                  {...props}
                />
              );
            },
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              return isInline ? (
                <code 
                  className={`px-1 py-0.5 rounded text-sm ${
                    isDarkMode 
                      ? 'bg-zinc-800 text-zinc-200' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children, ...props }) => (
              <pre 
                className={`p-4 rounded-lg overflow-x-auto text-sm max-w-full ${
                  isDarkMode 
                    ? 'bg-zinc-900 text-zinc-200' 
                    : 'bg-gray-50 text-gray-900'
                }`}
                style={{ 
                  wordWrap: "break-word", 
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap"
                }}
                {...props}
              >
                {children}
              </pre>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote 
                className={`border-l-4 pl-4 py-2 my-4 ${
                  isDarkMode 
                    ? 'border-zinc-600 text-zinc-300 bg-zinc-800/30' 
                    : 'border-gray-300 text-gray-600 bg-gray-50'
                }`}
                {...props}
              >
                {children}
              </blockquote>
            ),
            table: ({ children, ...props }) => (
              <div className="overflow-x-auto my-4 max-w-full">
                <table 
                  className={`w-full border-collapse ${
                    isDarkMode 
                      ? 'border-zinc-700' 
                      : 'border-gray-200'
                  }`}
                  style={{ tableLayout: "auto", maxWidth: "100%" }}
                  {...props}
                >
                  {children}
                </table>
              </div>
            ),
            th: ({ children, ...props }) => (
              <th 
                className={`border px-4 py-2 text-left font-semibold ${
                  isDarkMode 
                    ? 'border-zinc-700 bg-zinc-800 text-zinc-200' 
                    : 'border-gray-200 bg-gray-50 text-gray-900'
                }`}
                {...props}
              >
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td 
                className={`border px-4 py-2 ${
                  isDarkMode 
                    ? 'border-zinc-700 text-zinc-300' 
                    : 'border-gray-200 text-gray-700'
                }`}
                {...props}
              >
                {children}
              </td>
            ),
            h1: ({ children, ...props }) => (
              <h1 
                className={`text-2xl font-bold mb-4 mt-6 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}
                {...props}
              >
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 
                className={`text-xl font-bold mb-3 mt-5 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}
                {...props}
              >
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 
                className={`text-lg font-semibold mb-2 mt-4 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}
                {...props}
              >
                {children}
              </h3>
            ),
            p: ({ children, ...props }) => (
              <p className="mb-3" {...props}>
                {children}
              </p>
            ),
            ul: ({ children, ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
                {children}
              </ol>
            ),
            li: ({ children, ...props }) => (
              <li className={isDarkMode ? 'text-zinc-300' : 'text-gray-700'} {...props}>
                {children}
              </li>
            ),
          }}
          >
            {history.value}
          </ReactMarkdown>
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
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "1.6",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        minHeight: 0,
      }}
    />
  );
});

MarkdownCanvas.displayName = 'MarkdownCanvas';

export default MarkdownCanvas;