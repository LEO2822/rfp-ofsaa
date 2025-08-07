"use client";

import {
  ClockIcon,
  DocumentTextIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

interface RightSidebarProps {
  content: string;
  wordCount: number;
  readingTime: number;
}

export function RightSidebar({ content, wordCount, readingTime }: RightSidebarProps) {
  // Extract headings for table of contents
  const headings = content
    .split('\n')
    .filter(line => line.match(/^#+\s/))
    .map((line, index) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s/, '');
      return { id: index, level, text };
    });

  const scrollToHeading = (text: string) => {
    const element = document.querySelector(`h1, h2, h3, h4, h5, h6`);
    if (element && element.textContent === text) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-64 h-full bg-sidebar border-l border-sidebar-border flex flex-col">
      {/* Document Stats */}
      <div className="p-4 border-b border-sidebar-border">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Document Stats</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-4 h-4 text-sidebar-muted-foreground" />
              <span className="text-xs text-sidebar-muted-foreground">Words</span>
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">
              {wordCount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-sidebar-muted-foreground" />
              <span className="text-xs text-sidebar-muted-foreground">Reading time</span>
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">
              {readingTime} min
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HashtagIcon className="w-4 h-4 text-sidebar-muted-foreground" />
              <span className="text-xs text-sidebar-muted-foreground">Headings</span>
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">
              {headings.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="flex-1 p-4 border-b border-sidebar-border overflow-y-auto">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Table of Contents</h3>
          
          <div className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.text)}
                className={`w-full text-left px-2 py-1.5 rounded text-xs text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
                  heading.level > 1 ? 'ml-' + (heading.level - 1) * 3 : ''
                }`}
                style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
              >
                <div className="truncate">{heading.text}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Markdown Cheat Sheet */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Quick Reference</h3>
        
        <div className="space-y-2 text-xs">
          <div className="space-y-1">
            <div className="text-sidebar-muted-foreground">**bold** or __bold__</div>
            <div className="text-sidebar-muted-foreground">*italic* or _italic_</div>
            <div className="text-sidebar-muted-foreground">`code`</div>
            <div className="text-sidebar-muted-foreground"># Heading 1</div>
            <div className="text-sidebar-muted-foreground">## Heading 2</div>
            <div className="text-sidebar-muted-foreground">- List item</div>
            <div className="text-sidebar-muted-foreground">1. Numbered item</div>
            <div className="text-sidebar-muted-foreground">[Link](url)</div>
            <div className="text-sidebar-muted-foreground">![Image](url)</div>
            <div className="text-sidebar-muted-foreground">&gt; Quote</div>
          </div>
        </div>
      </div>
    </div>
  );
}