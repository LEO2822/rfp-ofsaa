"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { LeftSidebar } from "./left-sidebar";
import { MainEditor } from "./main-editor";
import { RightSidebar } from "./right-sidebar";

const defaultMarkdown = `# Welcome to Markdown Editor

This is a **VSCode-style** markdown editor with live preview, inspired by modern content management interfaces.

## Features

- **Clean, modern interface** with dark theme
- **Three-pane layout** with toggleable sidebars
- **Document management** with recent files
- **Live preview** with GitHub Flavored Markdown
- **Rich formatting toolbar** with quick actions
- **Document statistics** and table of contents
- **Markdown reference** for quick help

### Code Block Example

\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greeting("World"));
\`\`\`

### Lists and Organization

- **Bullet lists** for unordered items
- **Numbered lists** for sequential items
  - Nested items work perfectly
  - Multiple levels supported

1. First item
2. Second item
   - Sub-item A
   - Sub-item B

### Tables

| Feature | Status | Notes |
|---------|---------|-------|
| Editor | ✅ Complete | Monaco-based editor |
| Preview | ✅ Complete | Live markdown rendering |
| Sidebar | ✅ Complete | Document management |
| Themes | ✅ Complete | Dark theme implemented |

### Quotes and Callouts

> This is a blockquote that shows **bold** and *italic* formatting.
> 
> Multiple paragraphs are supported in blockquotes.

---

**Happy writing!** This editor combines the best of VSCode's interface design with powerful markdown editing capabilities. 🚀
`;

interface Document {
  id: string;
  name: string;
  content: string;
  lastModified: string;
}

export function MarkdownEditor() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Welcome.md",
      content: defaultMarkdown,
      lastModified: "2 minutes ago",
    },
    {
      id: "2",
      name: "Notes.md",
      content: "# My Notes\n\nThis is a simple note document.",
      lastModified: "1 hour ago",
    },
    {
      id: "3", 
      name: "Project-README.md",
      content: "# Project README\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\nDescribe how to use your project here.",
      lastModified: "Yesterday",
    },
  ]);

  const [currentDocumentId, setCurrentDocumentId] = useState("1");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const currentDocument = documents.find(doc => doc.id === currentDocumentId) || documents[0];

  const handleDocumentSelect = (document: Document) => {
    setCurrentDocumentId(document.id);
  };

  const handleNewDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: "Untitled.md",
      content: "# Untitled Document\n\nStart writing your markdown here...",
      lastModified: "Just now",
    };
    
    setDocuments(prev => [newDoc, ...prev]);
    setCurrentDocumentId(newDoc.id);
  };

  const handleContentChange = (content: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === currentDocumentId 
          ? { ...doc, content, lastModified: "Just now" }
          : doc
      )
    );
  };

  const handleSave = () => {
    // In a real app, this would save to a backend or local storage
    console.log("Saving document:", currentDocument.name);
  };

  // Calculate document stats
  const wordCount = currentDocument.content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 WPM average

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      {isLeftSidebarOpen && (
        <LeftSidebar
          documents={documents}
          currentDocumentId={currentDocumentId}
          onDocumentSelect={handleDocumentSelect}
          onNewDocument={handleNewDocument}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toggle Sidebar Button */}
        {!isLeftSidebarOpen && (
          <div className="absolute top-3 left-3 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLeftSidebarOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Bars3Icon className="w-4 h-4" />
            </Button>
          </div>
        )}

        <MainEditor
          document={currentDocument}
          onContentChange={handleContentChange}
          onSave={handleSave}
        />
      </div>

      {/* Right Sidebar */}
      {isRightSidebarOpen && (
        <RightSidebar
          content={currentDocument.content}
          wordCount={wordCount}
          readingTime={readingTime}
        />
      )}

      {/* Sidebar Toggle Buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          className="h-8 w-8 p-0"
          title="Toggle left sidebar"
        >
          <Bars3Icon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className="h-8 w-8 p-0"
          title="Toggle right sidebar"
        >
          <Bars3Icon className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
}