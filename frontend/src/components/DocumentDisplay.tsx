"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import TextSelectionToolbar from "./TextSelectionToolbar";

interface DocumentDisplayProps {
  isDarkMode: boolean;
  content: string;
  isCanvasMinimized?: boolean;
  onAskWrite?: (selectedText: string) => void;
  onMoveToCanvas?: (selectedText: string) => void;
}

export default function DocumentDisplay({ 
  isDarkMode, 
  content, 
  isCanvasMinimized = false, 
  onAskWrite, 
  onMoveToCanvas 
}: DocumentDisplayProps) {
  if (!content) {
    return (
      <div className="flex-1 flex flex-col h-full">
        {/* Document header separator */}
        <div className={`flex items-center justify-between px-6 py-4 border-b-2 ${
          isDarkMode ? 'border-white/30' : 'border-gray-300'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-1">
              <div className="h-5 w-5"></div>
            </div>
          </div>
        </div>
        
        <div className={`flex-1 flex items-center justify-center ${
          isCanvasMinimized ? 'px-20' : 'px-6'
        }`}>
          <div className={`text-center ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            <p className="text-sm">Upload a document to view its content here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Document header separator */}
      <div className={`flex items-center justify-between px-6 py-4 border-b-2 ${
        isDarkMode ? 'border-white/30' : 'border-gray-300'
      }`}>
        <div className="flex items-center gap-2">
          <div className="p-1">
            <div className="h-5 w-5"></div>
          </div>
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto overflow-x-hidden py-6 pb-4 ${
        isCanvasMinimized ? 'px-20' : 'px-6'
      }`}>
        <TextSelectionToolbar
          isDarkMode={isDarkMode}
          onAskWrite={onAskWrite}
          onMoveToCanvas={onMoveToCanvas}
        >
          <div 
            className="prose prose-sm max-w-none"
            style={{ 
              wordWrap: "break-word", 
              overflowWrap: "break-word",
              maxWidth: "100%",
              fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "1.6",
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
            {content}
          </ReactMarkdown>
          </div>
        </TextSelectionToolbar>
      </div>
    </div>
  );
}