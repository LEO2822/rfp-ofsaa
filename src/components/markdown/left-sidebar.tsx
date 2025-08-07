"use client";

import { useState } from "react";
import {
  DocumentTextIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  name: string;
  content: string;
  lastModified: string;
}

interface LeftSidebarProps {
  documents: Document[];
  currentDocumentId: string;
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
}

export function LeftSidebar({
  documents,
  currentDocumentId,
  onDocumentSelect,
  onNewDocument,
}: LeftSidebarProps) {
  const [isRecentExpanded, setIsRecentExpanded] = useState(true);

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <DocumentTextIcon className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-sidebar-foreground">Markdown Editor</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2 space-y-1">
        {/* Recent Documents */}
        <div>
          <button
            onClick={() => setIsRecentExpanded(!isRecentExpanded)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-sidebar-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            {isRecentExpanded ? (
              <ChevronDownIcon className="w-3 h-3" />
            ) : (
              <ChevronRightIcon className="w-3 h-3" />
            )}
            RECENT DOCUMENTS
          </button>

          {isRecentExpanded && (
            <div className="ml-5 space-y-0.5 mt-1">
              <Button
                onClick={onNewDocument}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-2 text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <PlusIcon className="w-3.5 h-3.5 mr-2" />
                New Document
              </Button>
              
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                    doc.id === currentDocumentId
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <DocumentTextIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="truncate font-medium">{doc.name}</div>
                    <div className="text-xs text-sidebar-muted-foreground">
                      {doc.lastModified}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-sidebar-foreground truncate">
              User
            </div>
            <div className="text-xs text-sidebar-muted-foreground">
              user@example.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}