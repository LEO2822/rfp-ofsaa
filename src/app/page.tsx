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

        {/* Three-panel layout */}
        <div className="relative flex h-full">
          {/* Left Sidebar: Conversation History */}
          <div className={`border-r border-white/10 bg-[#171717] transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4">
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors"
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
                {!sidebarCollapsed && (
                  <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                    <PlusIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Conversation List */}
              {!sidebarCollapsed && (
                <div className="flex-1 px-3 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-zinc-200/90 cursor-pointer hover:bg-white/20 transition-colors">
                      Hi there! How's your day going?
                    </div>
                    <div className="rounded-lg px-3 py-2 text-sm text-zinc-400/70 cursor-pointer hover:bg-white/10 transition-colors">
                      Previous conversation
                    </div>
                    <div className="rounded-lg px-3 py-2 text-sm text-zinc-400/70 cursor-pointer hover:bg-white/10 transition-colors">
                      Another chat
                    </div>
                  </div>
                </div>
              )}

              {/* Sidebar Bottom */}
              <div className="border-t border-white/10 p-3">
                <div className={`flex ${sidebarCollapsed ? 'flex-col gap-2' : 'items-center justify-between'}`}>
                  <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </button>
                  {!sidebarCollapsed ? (
                    <>
                      <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                        <UserIcon className="h-5 w-5" />
                      </button>
                      <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                        <Cog6ToothIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                        <UserIcon className="h-5 w-5" />
                      </button>
                      <button className="rounded-lg p-2 text-zinc-300/80 hover:bg-white/10 transition-colors">
                        <Cog6ToothIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Chat column */}
          <div className="relative flex flex-1 flex-col">
            <div className="flex h-full">
              <div className="relative flex flex-1 flex-col px-6 pt-6 md:px-8">
                {/* Top brand */}
                <div className="mb-4 flex items-center gap-1 text-zinc-200/90">
                  <span className="text-[15px] tracking-tight">ChatGPT</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-80" />
                </div>

                {/* Tag pill */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200/90 shadow-sm">
                  <DocumentTextIcon className="h-4 w-4" />
                  <span>New</span>
                </div>

                {/* Message bubble */}
                <div className="max-w-[520px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] leading-6 text-zinc-100/95 shadow-sm">
                  Hi there! How's your day going?
                  <div className="mt-3 flex items-center gap-2 text-zinc-300/60">
                    <ClipboardIcon className="h-4 w-4" />
                    <HandThumbUpIcon className="h-4 w-4" />
                    <HandThumbDownIcon className="h-4 w-4" />
                    <SpeakerWaveIcon className="h-4 w-4" />
                  </div>
                </div>

                {/* Bottom composer */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
                <div className="absolute inset-x-4 bottom-5 md:inset-x-8">
                  <div className="mx-auto max-w-[720px]">
                    <div className="flex items-center gap-2">
                      {/* Left actions */}
                      <button className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300/90 shadow-sm transition hover:bg-white/10">
                        <PlusIcon className="h-5 w-5" />
                      </button>

                      {/* Composer */}
                      <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-sm">
                        <input
                          className="w-full bg-transparent text-[15px] text-zinc-200 placeholder:text-zinc-400/70 focus:outline-none"
                          placeholder="Write or code"
                        />


                        {/* Right actions */}
                        <div className="flex items-center gap-2">
                          <button className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300/90 shadow-sm transition hover:bg-white/10">
                            <PaperAirplaneIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Canvas column */}
              <div className="relative hidden h-full w-1/2 flex-col border-l border-white/10 md:flex">
                {/* Canvas header */}
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-2 text-zinc-200">
                    <XMarkIcon className="h-5 w-5" />
                    <div className="flex items-center gap-1 text-sm">
                      <span className="opacity-90">New</span>
                      <ChevronDownIcon className="h-4 w-4 opacity-80" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300/80">
                    <ClockIcon className="h-5 w-5" />
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                    <ArrowUturnRightIcon className="h-5 w-5" />
                    <ArrowUpOnSquareIcon className="h-5 w-5" />
                    <LinkIcon className="h-5 w-5" />
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Canvas body */}
                <div className="relative flex-1 px-6">
                  <div className="mx-auto max-w-[640px] pt-6">
                    <div className="mb-6 text-zinc-300/90">Hi there! How's your day going?</div>
                    <div className="rounded-xl border border-white/10 bg-white/3 p-4 text-sm text-zinc-400/80">
                      Canvas - Click to edit and create content...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
