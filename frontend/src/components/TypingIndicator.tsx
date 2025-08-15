"use client";

import React from "react";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

export default function TypingIndicator({ isDarkMode }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 p-4 animate-pulse">
      {/* AI Avatar/Icon */}
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
        isDarkMode 
          ? 'bg-blue-500/20 text-blue-400' 
          : 'bg-blue-100 text-blue-600'
      }`}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* Typing Text and Dots */}
      <div className="flex items-center gap-2">
        <span className={`text-sm ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          AI is thinking
        </span>
        
        {/* Animated Dots */}
        <div className="flex items-center gap-1">
          <div className={`w-1 h-1 rounded-full ${
            isDarkMode ? 'bg-zinc-400' : 'bg-gray-400'
          } animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-1 h-1 rounded-full ${
            isDarkMode ? 'bg-zinc-400' : 'bg-gray-400'
          } animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-1 h-1 rounded-full ${
            isDarkMode ? 'bg-zinc-400' : 'bg-gray-400'
          } animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}