"use client";

import React from "react";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

export default function TypingIndicator({ isDarkMode }: TypingIndicatorProps) {
  return (
    <div className="relative flex items-center gap-4 p-6 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-blue-400/30' : 'bg-blue-500/20'
            }`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 200}ms`,
              animation: `float 3s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main AI Brain */}
      <div className="relative flex-shrink-0">
        {/* Outer Pulsing Ring */}
        <div className={`absolute inset-0 w-12 h-12 rounded-full ${
          isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
        } animate-ping`} />
        
        {/* Middle Rotating Ring */}
        <div className={`absolute inset-1 w-10 h-10 rounded-full border-2 ${
          isDarkMode ? 'border-blue-400/40' : 'border-blue-500/40'
        }`} style={{ animation: 'spin 2s linear infinite' }} />
        
        {/* Inner Gradient Core */}
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${
          isDarkMode 
            ? 'from-blue-500/30 via-purple-500/20 to-cyan-500/30' 
            : 'from-blue-400/30 via-purple-400/20 to-cyan-400/30'
        } backdrop-blur-sm border ${
          isDarkMode ? 'border-white/20' : 'border-black/10'
        }`} style={{ 
          animation: 'pulse 2s ease-in-out infinite',
          boxShadow: isDarkMode 
            ? '0 0 20px rgba(59, 130, 246, 0.3)' 
            : '0 0 20px rgba(59, 130, 246, 0.2)'
        }}>
          {/* Neural Network Icon */}
          <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.12.23-2.19.64-3.17L6.5 10.5c.39.39 1.02.39 1.41 0L12 6.41l4.09 4.09c.39.39 1.02.39 1.41 0l1.86-1.67c.41.98.64 2.05.64 3.17 0 4.41-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3" opacity="0.7"/>
            <circle cx="7" cy="7" r="1.5" opacity="0.5"/>
            <circle cx="17" cy="7" r="1.5" opacity="0.5"/>
            <circle cx="7" cy="17" r="1.5" opacity="0.5"/>
            <circle cx="17" cy="17" r="1.5" opacity="0.5"/>
          </svg>
          
          {/* Floating Data Bits */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
              }`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 500}ms`,
                animation: `orbit 4s ease-in-out infinite`,
                transformOrigin: '200% 200%'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced Text with Gradient Animation */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-400 via-purple-400 to-cyan-400' 
              : 'from-blue-600 via-purple-600 to-cyan-600'
          } bg-clip-text text-transparent animate-pulse`}>
            AI is analyzing your request
          </span>
        </div>
        
        {/* Dynamic Progress Bar */}
        <div className={`w-32 h-0.5 rounded-full overflow-hidden ${
          isDarkMode ? 'bg-white/10' : 'bg-black/10'
        }`}>
          <div className={`h-full bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-500 via-purple-500 to-cyan-500' 
              : 'from-blue-600 via-purple-600 to-cyan-600'
          }`} style={{ 
            width: '60%',
            animation: 'progress 2s ease-in-out infinite alternate'
          }} />
        </div>
        
        {/* Floating Thought Bubbles */}
        <div className="flex items-center gap-2 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400/60 to-purple-400/60' 
                  : 'bg-gradient-to-r from-blue-500/60 to-purple-500/60'
              }`}
              style={{ 
                animationDelay: `${i * 200}ms`,
                animation: `thoughtBubble 3s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          to { transform: translateY(-10px) rotate(180deg); opacity: 0.3; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        @keyframes progress {
          from { width: 30%; }
          to { width: 80%; }
        }
        @keyframes thoughtBubble {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.4; }
          50% { transform: translateY(-6px) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}