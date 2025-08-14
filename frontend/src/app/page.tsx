"use client";

import React, { useState, useEffect } from "react";
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
  ArrowUpTrayIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import MarkdownCanvas from "@/components/MarkdownCanvas";

// NOTE: This is a single-file React component meant to closely replicate the
// provided screenshot, using Heroicons and Inter (Medium). Tailwind is used for
// layout/spacing/visuals. Exact pixel parity in every environment is not
// guaranteed, but spacing, colors, and hierarchy are tuned carefully to match.

export default function ChatGPTReplica() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Handle escape key to close help modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
      }
    };

    if (showHelp) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showHelp]);

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

        {/* Top left controls */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {/* Theme toggle button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
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
          
          {/* Upload button */}
          <button
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-zinc-200' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
            }`}
            aria-label="Upload file"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Upload</span>
          </button>
        </div>

        {/* Two-panel layout */}
        <div className="relative h-full w-full flex flex-col md:flex-row">
          {/* Left: Chat column */}
          <div className="relative flex h-full flex-col w-full md:w-1/2 flex-shrink-0">
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
          <div className={`relative hidden h-full flex-col border-l-2 md:flex w-full md:w-1/2 flex-shrink-0 ${
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
                <button 
                  onClick={() => setShowHelp(true)}
                  className={`p-1 transition-colors ${
                    isDarkMode ? 'hover:text-zinc-200' : 'hover:text-gray-800'
                  }`}
                  aria-label="Help & Guide"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Canvas body */}
            <div className="flex-1 flex flex-col p-2 min-h-0 overflow-hidden">
              <MarkdownCanvas isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: isDarkMode ? 'rgba(11, 11, 13, 0.8)' : 'rgba(255, 250, 245, 0.8)' }}
            onClick={() => setShowHelp(false)}
          >
            <div 
              className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-zinc-900/95 text-zinc-100 border border-white/20' 
                  : 'bg-white/95 text-gray-900 border border-amber-200/50'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`flex-shrink-0 flex items-center justify-between p-6 border-b backdrop-blur-sm ${
                isDarkMode 
                  ? 'border-white/20 bg-zinc-900/90' 
                  : 'border-amber-200/50 bg-white/90'
              }`}>
                <h2 className="text-2xl font-medium" style={{ fontWeight: 500 }}>
                  📝 Markdown Canvas Guide
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-white/10 text-zinc-300/90 hover:text-zinc-200' 
                      : 'hover:bg-amber-100 text-gray-600 hover:text-amber-900'
                  }`}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-6 space-y-8 overflow-y-auto min-h-0" style={{ fontWeight: 500 }}>
                {/* How It Works */}
                <section>
                  <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                    ⚡ How the Canvas Works
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p className={isDarkMode ? 'text-zinc-200' : 'text-gray-900'}>
                      The Markdown Canvas is a smart editor that switches between <strong>Edit Mode</strong> and <strong>Preview Mode</strong>:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Edit Mode:</strong> Type or paste Markdown - shows as plain text</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span><strong>Preview Mode:</strong> Shows beautifully rendered Markdown with formatting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span><strong>Auto-Switch:</strong> Automatically switches to preview 1.5 seconds after you stop typing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span><strong>Click to Edit:</strong> Click anywhere in preview mode to edit again</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Keyboard Shortcuts */}
                <section>
                  <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                    ⌨️ Keyboard Shortcuts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <kbd className={`px-3 py-1.5 text-xs rounded-full ${
                          isDarkMode 
                            ? 'bg-white/10 text-zinc-300' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>Escape</kbd>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>Preview Now</span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400/70' : 'text-gray-500'
                      }`}>Instantly switch to preview mode</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-1 items-center">
                          <kbd className={`px-3 py-1.5 text-xs rounded-full ${
                            isDarkMode 
                              ? 'bg-white/10 text-zinc-300' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>Ctrl</kbd>
                          <span className={`text-xs ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`}>+</span>
                          <kbd className={`px-3 py-1.5 text-xs rounded-full ${
                            isDarkMode 
                              ? 'bg-white/10 text-zinc-300' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>Enter</kbd>
                        </div>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>Preview Now</span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400/70' : 'text-gray-500'
                      }`}>Alternative preview shortcut</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <kbd className={`px-3 py-1.5 text-xs rounded-full ${
                          isDarkMode 
                            ? 'bg-white/10 text-zinc-300' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>Enter</kbd>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>New Line</span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400/70' : 'text-gray-500'
                      }`}>Create new line (normal behavior)</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <kbd className={`px-3 py-1.5 text-xs rounded-full ${
                          isDarkMode 
                            ? 'bg-white/10 text-zinc-300' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>Click</kbd>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>Edit Mode</span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400/70' : 'text-gray-500'
                      }`}>Click preview to return to editing</p>
                    </div>
                  </div>
                </section>

                {/* Markdown Syntax Guide */}
                <section>
                  <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                    📚 Markdown Syntax Guide
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Headings */}
                    <div>
                      <h4 className={`mb-2 text-blue-500 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} style={{ fontWeight: 500 }}>Headings</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div># Heading 1</div>
                        <div>## Heading 2</div>
                        <div>### Heading 3</div>
                      </div>
                    </div>

                    {/* Text Formatting */}
                    <div>
                      <h4 className={`mb-2 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} style={{ fontWeight: 500 }}>Text Formatting</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div>**bold text**</div>
                        <div>*italic text*</div>
                        <div>`inline code`</div>
                        <div>~~strikethrough~~</div>
                      </div>
                    </div>

                    {/* Lists */}
                    <div>
                      <h4 className={`mb-2 ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} style={{ fontWeight: 500 }}>Lists</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div>- Bullet point</div>
                        <div>- Another item</div>
                        <div className="mt-2">1. Numbered list</div>
                        <div>2. Second item</div>
                      </div>
                    </div>

                    {/* Links & Images */}
                    <div>
                      <h4 className={`mb-2 ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                      }`} style={{ fontWeight: 500 }}>Links & Images</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div>[Link text](https://url.com)</div>
                        <div>![Image](image-url.jpg)</div>
                      </div>
                    </div>

                    {/* Code Blocks */}
                    <div>
                      <h4 className={`mb-2 ${
                        isDarkMode ? 'text-red-400' : 'text-red-600'
                      }`} style={{ fontWeight: 500 }}>Code Blocks</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div>```javascript</div>
                        <div>const code = &quot;here&quot;;</div>
                        <div>```</div>
                      </div>
                    </div>

                    {/* Tables */}
                    <div>
                      <h4 className={`mb-2 ${
                        isDarkMode ? 'text-teal-400' : 'text-teal-600'
                      }`} style={{ fontWeight: 500 }}>Tables</h4>
                      <div className={`p-3 rounded-lg text-sm font-mono border ${
                        isDarkMode 
                          ? 'bg-white/[0.03] border-white/10' 
                          : 'bg-[#FFF8F0] border-amber-200/50'
                      }`}>
                        <div>| Header | Header |</div>
                        <div>|--------|--------|</div>
                        <div>| Cell   | Cell   |</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Advanced Features */}
                <section>
                  <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                    🚀 Advanced Features
                  </h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <h4 className="mb-2" style={{ fontWeight: 500 }}>✨ Smart Paste</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-zinc-400/80' : 'text-gray-600'
                      }`}>Paste large Markdown content and it automatically switches to preview mode for instant visualization.</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <h4 className="mb-2" style={{ fontWeight: 500 }}>🎯 Syntax Highlighting</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-zinc-400/80' : 'text-gray-600'
                      }`}>Code blocks automatically get syntax highlighting for better readability.</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <h4 className="mb-2" style={{ fontWeight: 500 }}>📱 Responsive Design</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-zinc-400/80' : 'text-gray-600'
                      }`}>Works perfectly on both desktop and mobile devices with proper text wrapping.</p>
                    </div>
                    <div className={`p-4 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-[#FFF8F0] border-amber-200/50'
                    }`}>
                      <h4 className="mb-2" style={{ fontWeight: 500 }}>🌙 Theme Support</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-zinc-400/80' : 'text-gray-600'
                      }`}>Automatically adapts to light and dark themes for comfortable viewing.</p>
                    </div>
                  </div>
                </section>

                {/* Tips & Tricks */}
                <section>
                  <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 500 }}>
                    💡 Tips & Tricks
                  </h3>
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode 
                        ? 'bg-blue-400/10 border-blue-400 text-blue-300' 
                        : 'bg-blue-50 border-blue-400 text-blue-700'
                    }`}>
                      <strong>Tip:</strong> Use the 1.5-second auto-preview to write naturally without interruption.
                    </div>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode 
                        ? 'bg-green-400/10 border-green-400 text-green-300' 
                        : 'bg-green-50 border-green-400 text-green-700'
                    }`}>
                      <strong>Tip:</strong> Press Escape for instant preview when you want to see results immediately.
                    </div>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode 
                        ? 'bg-purple-400/10 border-purple-400 text-purple-300' 
                        : 'bg-purple-50 border-purple-400 text-purple-700'
                    }`}>
                      <strong>Tip:</strong> Click anywhere in the preview to continue editing from where you left off.
                    </div>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode 
                        ? 'bg-orange-400/10 border-orange-400 text-orange-300' 
                        : 'bg-orange-50 border-orange-400 text-orange-700'
                    }`}>
                      <strong>Tip:</strong> Long content automatically scrolls - both in edit and preview modes.
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className={`flex-shrink-0 flex justify-end p-6 border-t backdrop-blur-sm ${
                isDarkMode 
                  ? 'border-white/20 bg-zinc-900/90' 
                  : 'border-amber-200/50 bg-white/90'
              }`}>
                <button
                  onClick={() => setShowHelp(false)}
                  className={`px-6 py-3 rounded-full transition-colors shadow-sm ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/20' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200/50'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
