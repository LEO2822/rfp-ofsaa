import React from "react";
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
  MicrophoneIcon,
  PencilSquareIcon,
  PaperClipIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

// NOTE: This is a single-file React component meant to closely replicate the
// provided screenshot, using Heroicons and Inter (Medium). Tailwind is used for
// layout/spacing/visuals. Exact pixel parity in every environment is not
// guaranteed, but spacing, colors, and hierarchy are tuned carefully to match.

export default function ChatGPTReplica() {
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
          <div className="relative flex h-full flex-col px-6 pt-6 md:px-8">
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

                    {/* Canvas toggle chip */}
                    <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300/90 md:inline-flex">
                      <PaperClipIcon className="h-3.5 w-3.5" />
                      <span>Canvas</span>
                      <XMarkIcon className="h-3.5 w-3.5 opacity-70" />
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                      <button className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300/90 shadow-sm transition hover:bg-white/10">
                        <MicrophoneIcon className="h-5 w-5" />
                      </button>
                      <button className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300/90 shadow-sm transition hover:bg-white/10">
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pl-12 text-[11px] text-zinc-400/70">
                  ChatGPT can make mistakes. Check important info. See Cookie Preferences.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Canvas column */}
          <div className="relative hidden h-full flex-col border-l border-white/10 md:flex">
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
                  Write something...
                </div>
              </div>

              {/* Floating pencil in bottom-right */}
              <button className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 shadow-md transition hover:bg-white/10">
                <PencilSquareIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
