"use client";

import DocumentPreviewer from "../components/DocumentPreviewer";
import ThemeToggle from "../components/ThemeToggle";
import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      {/* Notion-like top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-3 w-3 rounded-sm bg-foreground" />
          <span className="font-medium tracking-tight">Notebook</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input placeholder="Search" className="h-8 w-48 rounded-sm border border-border pl-7 pr-2 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground bg-background" />
          </div>
          <button className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-xs hover:bg-foreground hover:text-background transition-colors">
            <PencilSquareIcon className="h-4 w-4" />
            New
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Two-column workspace */}
      <main className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-52px)]">
        {/* Left: File preview */}
        <section className="border-r border-border min-h-0">
          <DocumentPreviewer />
        </section>
        {/* Right: Placeholder for Markdown mirror */}
        <section className="min-h-0 flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="text-sm">Markdown</div>
            <div className="text-xs text-foreground/60">Coming soon</div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-2xl space-y-4 text-foreground/70">
              <p>Upload a PDF or DOCX on the left. The right side will display a clean Markdown representation later.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Monochrome, minimal UI</li>
                <li>Notion-inspired layout</li>
                <li>Inter Medium font, Heroicons</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
