"use client";

import React, { useState } from "react";
import {
  ChevronDownIcon,
  DocumentTextIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowUpOnSquareIcon,
  LinkIcon,
  ArrowDownTrayIcon,
  ClipboardIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  SpeakerWaveIcon,
  PlusIcon,
  Bars3Icon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

// NOTE: This is a single-file React component meant to closely replicate the
// provided screenshot, using Heroicons and Inter (Medium). Tailwind is used for
// layout/spacing/visuals. Exact pixel parity in every environment is not
// guaranteed, but spacing, colors, and hierarchy are tuned carefully to match.

export default function ChatGPTReplica() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen w-full ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isDarkMode ? 'selection:bg-white/10' : 'selection:bg-gray-300'}`}
      style={{
        // Inter Medium across the app
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        fontWeight: 500,
      }}
    >
      {/* Import Inter 500 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
        
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(10%, -10%) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(-15%, 15%) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translate(20%, -5%) rotate(270deg) scale(1.05);
          }
        }
        
        @keyframes gradient-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes gradient-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes gradient-flow {
          0% {
            transform: translateX(-100%) translateY(0%) rotate(0deg);
          }
          50% {
            transform: translateX(100%) translateY(-50%) rotate(180deg);
          }
          100% {
            transform: translateX(-100%) translateY(0%) rotate(360deg);
          }
        }
        
        .animated-gradient {
          animation: gradient-shift 25s ease-in-out infinite;
        }
        
        .animated-gradient-2 {
          animation: gradient-shift 20s ease-in-out infinite reverse;
        }
        
        .animated-gradient-3 {
          animation: gradient-rotate 30s ease-in-out infinite;
        }
        
        .animated-gradient-4 {
          animation: gradient-flow 35s ease-in-out infinite;
        }
        
        .animated-gradient-5 {
          animation: gradient-pulse 15s ease-in-out infinite;
        }
      `}</style>

      {/* App background */}
      <div className={`relative h-screen w-full overflow-hidden ${isDarkMode ? 'bg-[#0B0B0D]' : 'bg-[#FFFAF5]'}`}>
        {/* Animated gradient backgrounds */}
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 opacity-70">
              <div className="animated-gradient absolute top-0 -left-1/4 h-[150%] w-[150%] bg-gradient-to-br from-emerald-500/20 via-teal-600/15 to-cyan-500/20 blur-3xl" />
              <div className="animated-gradient-2 absolute -top-1/4 right-0 h-[150%] w-[150%] bg-gradient-to-bl from-violet-600/25 via-fuchsia-600/20 to-pink-500/25 blur-3xl" />
              <div className="animated-gradient-3 absolute bottom-0 left-1/3 h-[120%] w-[120%] bg-gradient-to-tr from-indigo-600/20 via-blue-600/15 to-purple-600/20 blur-3xl" />
              <div className="animated-gradient absolute top-1/2 right-1/4 h-[100%] w-[100%] bg-gradient-to-tl from-rose-600/15 via-orange-600/10 to-amber-600/15 blur-3xl" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-35">
              <div className="animated-gradient absolute top-0 -right-1/4 h-[140%] w-[140%] bg-gradient-to-bl from-rose-400/60 via-pink-300/40 to-transparent blur-3xl" />
              <div className="animated-gradient-2 absolute -bottom-1/4 left-0 h-[140%] w-[140%] bg-gradient-to-tr from-amber-400/50 via-orange-300/30 to-transparent blur-3xl" />
              <div className="animated-gradient-3 absolute top-1/4 left-1/4 h-[100%] w-[100%] bg-gradient-to-br from-emerald-400/40 via-teal-300/30 to-transparent blur-3xl" />
              <div className="animated-gradient-4 absolute bottom-0 right-0 h-[120%] w-[120%] bg-gradient-to-tl from-violet-400/50 via-purple-300/30 to-transparent blur-3xl" />
              <div className="animated-gradient-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[80%] bg-gradient-to-r from-sky-400/30 via-transparent to-indigo-400/30 blur-3xl" />
            </div>
          </>
        )}

        {/* Theme toggle button - top left corner */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-4 left-4 z-10 p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-white/10 hover:bg-white/20 text-zinc-200' 
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>

        {/* Two-panel layout */}
        <div className="relative h-full w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left: Chat column */}
          <div className="relative flex h-full flex-col">
            {/* Chat content area */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">
                {/* Chat messages would go here */}
              </div>
            </div>
            
            {/* Bottom composer - centered */}
            <div className="flex items-center justify-center pb-8">
              <div className="w-full max-w-[720px] px-4">
                <div className="flex items-center gap-2">
                  {/* Composer */}
                  <div className={`flex w-full items-center gap-3 rounded-full border px-4 py-3 shadow-sm ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.03]' 
                      : 'border-amber-200/50 bg-[#FFF8F0]'
                  }`}>
                    <button className={`transition-colors ${
                      isDarkMode 
                        ? 'text-zinc-300/90 hover:text-zinc-200' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}>
                      <PlusIcon className="h-5 w-5" />
                    </button>
                    <input
                      className={`w-full bg-transparent text-[15px] focus:outline-none ${
                        isDarkMode 
                          ? 'text-zinc-200 placeholder:text-zinc-400/70' 
                          : 'text-gray-900 placeholder:text-gray-500'
                      }`}
                      placeholder="Ask or Make changes"
                    />
                    {/* Right actions */}
                    <button className={`transition-colors ${
                      isDarkMode 
                        ? 'text-zinc-300/90 hover:text-zinc-200' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}>
                      <ArrowRightCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Canvas column */}
          <div className={`relative hidden h-full flex-col border-l-2 md:flex ${
            isDarkMode ? 'border-white/20' : 'border-gray-300'
          }`}>
            {/* Canvas header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b-2 ${
              isDarkMode ? 'border-white/20' : 'border-gray-300'
            }`}>
              <div className={`flex items-center gap-2 ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-700'
              }`}>
                <XMarkIcon className="h-5 w-5" />
                <div className="flex items-center gap-1 text-sm">
                  <span className="opacity-90">New</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-80" />
                </div>
              </div>
              <div className={`flex items-center gap-3 ml-auto ${
                isDarkMode ? 'text-zinc-300/80' : 'text-gray-600'
              }`}>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <ClockIcon className="h-5 w-5" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <ArrowUpOnSquareIcon className="h-5 w-5" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <LinkIcon className="h-5 w-5" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                }`}>
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Canvas body */}
            <div className="flex-1 p-6">
              <textarea
                className={`w-full h-full resize-none bg-transparent p-4 focus:outline-none ${
                  isDarkMode 
                    ? 'text-zinc-200 placeholder:text-zinc-400/30' 
                    : 'text-gray-900 placeholder:text-gray-500/50'
                }`}
                placeholder="Start typing here..."
                style={{
                  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
