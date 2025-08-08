"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpTrayIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { renderAsync } from "docx-preview";

type SupportedKind = "pdf" | "docx";

function inferKind(file: File): SupportedKind | null {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  if (name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "docx";
  return null;
}

export default function DocumentPreviewer() {
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<SupportedKind | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const reset = useCallback(() => {
    setFile(null);
    setKind(null);
    setError(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    if (docxContainerRef.current) docxContainerRef.current.innerHTML = "";
    if (inputRef.current) inputRef.current.value = "";
  }, [objectUrl]);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    const k = inferKind(f);
    if (!k) {
      setError("Unsupported file. Please upload a PDF or DOCX.");
      return;
    }
    setError(null);
    setFile(f);
    setKind(k);

    if (k === "pdf") {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const url = URL.createObjectURL(f);
      setObjectUrl(url);
      if (docxContainerRef.current) docxContainerRef.current.innerHTML = "";
    } else if (k === "docx") {
      if (docxContainerRef.current) docxContainerRef.current.innerHTML = "";
      try {
        const arrayBuffer = await f.arrayBuffer();
        await renderAsync(arrayBuffer, docxContainerRef.current as HTMLDivElement, undefined, {
          className: "docx-preview",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          breakPages: true,
          experimental: true,
          trimXmlDeclaration: true,
        });
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          setObjectUrl(null);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to render DOCX file.");
      }
    }
  }, [objectUrl]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [handleFiles]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const hint = useMemo(() => {
    if (file && kind) return `${file.name}`;
    return "Drop a PDF or DOCX here, or upload";
  }, [file, kind]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 text-sm">
          <DocumentTextIcon className="h-5 w-5" aria-hidden />
          <span className="truncate max-w-[20ch]" title={file?.name ?? "No file"}>{file?.name ?? "No file selected"}</span>
        </div>
        <div className="flex items-center gap-2">
          {file && (
            <button onClick={reset} className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-foreground hover:text-background transition-colors">
              <XMarkIcon className="h-4 w-4" />
              Clear
            </button>
          )}
          <button onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-foreground hover:text-background transition-colors">
            <ArrowUpTrayIcon className="h-4 w-4" />
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => handleFiles(e.currentTarget.files)}
          />
        </div>
      </div>

      <div
        className="relative flex-1 overflow-auto"
        onDrop={onDrop}
        onDragOver={onDragOver}
        aria-label="Document preview area"
      >
        {!file && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-dashed border-2 border-border m-4 rounded-sm text-center text-sm text-foreground/60">
            <p className="px-4">{hint}</p>
            <p className="text-xs text-foreground/40">Only black & white UI. No upload leaves are sent anywhere.</p>
          </div>
        )}

        {error && (
          <div className="m-4 rounded-sm border border-border bg-background p-3 text-sm text-foreground">
            {error}
          </div>
        )}

        {/* PDF Preview */}
        {kind === "pdf" && objectUrl && (
          <div className="h-full">
            <iframe
              title={file?.name || "PDF preview"}
              src={objectUrl}
              className="h-full w-full monochrome"
            />
          </div>
        )}

        {/* DOCX Preview */}
        {kind === "docx" && (
          <div ref={docxContainerRef} className="docx-container p-6 monochrome">
            {/* docx-preview renders into this container */}
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Ensure docx-preview outputs stay monochrome/minimal */
        .docx-container { background: var(--background); color: var(--foreground); }
        .docx { color: inherit; }
        .docx a { color: inherit; text-decoration: underline; }
        .docx table, .docx td, .docx th { border-color: var(--border) !important; }
        .monochrome { filter: grayscale(1); }
      `}</style>
    </div>
  );
}
