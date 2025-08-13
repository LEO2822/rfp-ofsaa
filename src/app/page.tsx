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
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

// NOTE: This is a single-file React component meant to closely replicate the
// provided screenshot, using Heroicons and Inter (Medium). Tailwind is used for
// layout/spacing/visuals. Exact pixel parity in every environment is not
// guaranteed, but spacing, colors, and hierarchy are tuned carefully to match.

export default function ChatGPTReplica() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen w-full text-white selection:bg-white/10"
      style={{
        // Inter Medium across the app
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        fontWeight: 500,
      }}
    >
      {/* Import Inter 500 */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');`}</style>

      {/* App background approximating ChatGPT dark theme */}
      <div className="relative h-screen w-full bg-[#0B0B0D]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* Two-panel layout */}
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-1 md:grid-cols-2">
          {/* Left: Chat column */}
          <div className="relative flex h-full flex-col">
            {/* Chat content area */}
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="w-full max-w-[640px]">
                {/* Chat messages would go here */}
              </div>
            </div>
            
            {/* Bottom composer */}
            <div className="px-8 pb-8">
              <div className="mx-auto max-w-[640px]">
                <div className="flex items-center gap-2">
                  {/* Composer */}
                  <div className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 shadow-sm">
                    <button className="text-zinc-300/90 hover:text-zinc-200 transition-colors">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                    <input
                      className="w-full bg-transparent text-[15px] text-zinc-200 placeholder:text-zinc-400/70 focus:outline-none"
                      placeholder="Write or code"
                    />
                    {/* Right actions */}
                    <button className="text-zinc-300/90 hover:text-zinc-200 transition-colors">
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Canvas column */}
          <div className="relative hidden h-full flex-col border-l border-white/10 md:flex">
            {/* Canvas header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-zinc-200">
                <XMarkIcon className="h-5 w-5" />
                <div className="flex items-center gap-1 text-sm">
                  <span className="opacity-90">New</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-80" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-zinc-300/80">
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <ClockIcon className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <ArrowUpOnSquareIcon className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <LinkIcon className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-zinc-200 transition-colors">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Canvas body */}
            <div className="flex-1 px-8 py-8">
              <div className="mx-auto w-full max-w-[640px] h-full">
                <div className="w-full h-full min-h-[400px] rounded-xl border border-white/10 bg-white/3 p-6 text-sm text-zinc-400/80">
                  Canvas - Click to edit and create content...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
