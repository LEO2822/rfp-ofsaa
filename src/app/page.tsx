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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');`}</style>

      {/* App background */}
      <div className={`relative h-screen w-full ${isDarkMode ? 'bg-[#0B0B0D]' : 'bg-gray-50'}`}>
        {isDarkMode && <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(255,255,255,0.05),transparent_60%)]" />}

        {/* Theme toggle button - top left corner */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-4 left-4 z-10 p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-white/10 hover:bg-white/20 text-zinc-200' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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
                      : 'border-gray-300 bg-white'
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
