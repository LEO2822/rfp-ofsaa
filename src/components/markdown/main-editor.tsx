"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  EyeIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ArrowsPointingOutIcon,
  ChevronRightIcon,
  Bars3Icon,
  Bars4Icon,
  ListBulletIcon,
  NumberedListIcon,
  LinkIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  name: string;
  content: string;
  lastModified: string;
}

interface MainEditorProps {
  document: Document;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

type ViewMode = "split" | "edit" | "preview";

export function MainEditor({ document, onContentChange, onSave }: MainEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const editorRef = useRef<unknown>(null);

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
    (editor as { focus: () => void }).focus();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(document.content);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const insertAtCursor = (text: string) => {
    const editor = editorRef.current as unknown;
    if (editor && typeof editor === 'object' && editor !== null) {
      const editorInstance = editor as {
        getSelection: () => { getStartPosition: () => unknown; getEndPosition: () => unknown };
        getValue: () => string;
        getModel: () => { getOffsetAt: (position: unknown) => number } | null;
      };
      
      const selection = editorInstance.getSelection();
      const newContent = editorInstance.getValue();
      const model = editorInstance.getModel();
      
      if (model && selection) {
        const startOffset = model.getOffsetAt(selection.getStartPosition());
        const endOffset = model.getOffsetAt(selection.getEndPosition());
        const beforeSelection = newContent.substring(0, startOffset);
        const afterSelection = newContent.substring(endOffset);
        const updatedContent = beforeSelection + text + afterSelection;
        
        onContentChange(updatedContent);
      }
    }
  };

  const formatActions = [
    { icon: Bars3Icon, action: () => insertAtCursor("# "), tooltip: "Heading 1" },
    { icon: Bars4Icon, action: () => insertAtCursor("## "), tooltip: "Heading 2" },
    { icon: ListBulletIcon, action: () => insertAtCursor("- "), tooltip: "Bullet List" },
    { icon: NumberedListIcon, action: () => insertAtCursor("1. "), tooltip: "Numbered List" },
    { icon: LinkIcon, action: () => insertAtCursor("[text](url)"), tooltip: "Link" },
    { icon: PhotoIcon, action: () => insertAtCursor("![alt](url)"), tooltip: "Image" },
    { icon: ChatBubbleLeftRightIcon, action: () => insertAtCursor("> "), tooltip: "Quote" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Breadcrumb Navigation */}
      <div className="px-6 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Documents</span>
          <ChevronRightIcon className="w-4 h-4" />
          <span>Recent</span>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-foreground font-medium">{document.name}</span>
        </div>
      </div>

      {/* Title Area */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-1">
              {document.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Last modified: {document.lastModified}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "preview" ? "split" : "preview")}
              className="h-8"
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              {viewMode === "preview" ? "Edit" : "Preview"}
            </Button>
            
            <Button
              variant="outline" 
              size="sm"
              onClick={onSave}
              className="h-8"
            >
              Save draft
            </Button>
            
            <Button size="sm" className="h-8">
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="px-6 py-2 border-b border-border bg-muted/10">
        <div className="flex items-center gap-1">
          <select className="text-sm bg-input border border-border rounded px-2 py-1 text-foreground">
            <option>Inter</option>
            <option>Monaco</option>
            <option>System</option>
          </select>
          
          <select className="text-sm bg-input border border-border rounded px-2 py-1 text-foreground ml-2">
            <option>14px</option>
            <option>12px</option>
            <option>16px</option>
          </select>

          <div className="w-px h-6 bg-border mx-2" />

          {formatActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action.action}
              className="h-8 w-8 p-0"
              title={action.tooltip}
            >
              <action.icon className="w-4 h-4" />
            </Button>
          ))}

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
            title="Copy"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
          </Button>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant={viewMode === "edit" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("edit")}
              className="h-8 px-3"
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant={viewMode === "split" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("split")}
              className="h-8 px-3"
            >
              <ArrowsPointingOutIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant={viewMode === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("preview")}
              className="h-8 px-3"
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Pane */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} border-r border-border`}>
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={document.content}
              onChange={(value) => onContentChange(value || "")}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 22,
                fontFamily: "ui-monospace, 'Monaco', 'Cascadia Code', 'Segoe UI Mono', monospace",
                wordWrap: "on",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                renderWhitespace: "none",
                folding: true,
                bracketPairColorization: { enabled: false },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        )}

        {/* Preview Pane */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} overflow-auto`}>
            <div className="p-6 max-w-none prose prose-sm prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-semibold mb-4 text-foreground border-b border-border pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold mb-3 text-foreground">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold mb-2 text-foreground">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed mb-4 text-foreground">
                      {children}
                    </p>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono mb-4 border border-border">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-primary pl-4 ml-0 italic text-muted-foreground mb-4">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm text-foreground">
                      {children}
                    </li>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border border-border">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border bg-muted px-3 py-2 text-left text-sm font-semibold text-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-3 py-2 text-sm text-foreground">
                      {children}
                    </td>
                  ),
                  hr: () => (
                    <hr className="border-border my-6" />
                  ),
                }}
              >
                {document.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}