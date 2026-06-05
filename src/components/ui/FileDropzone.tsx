"use client";

import { useRef, useState, useCallback } from "react";
import { IconUpload, IconFile, IconX, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  url: string;
  r2Key: string;
  size: number;
}

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  folder?: string;
  label?: string;
  hint?: string;
  onUpload: (files: UploadedFile[]) => void;
  className?: string;
  maxMB?: number;
}

export function FileDropzone({
  accept = "image/*",
  multiple = false,
  folder = "uploads",
  label = "Drop files here or click to upload",
  hint,
  onUpload,
  className,
  maxMB = 10,
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ name: string; status: "uploading" | "done" | "error" }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    setProgress(files.map(f => ({ name: f.name, status: "uploading" })));
    const results: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxMB * 1024 * 1024) {
        setProgress(p => p.map((x, idx) => idx === i ? { ...x, status: "error" } : x));
        continue;
      }
      try {
        const presignRes = await fetch("/api/upload/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type, folder }),
        });
        if (!presignRes.ok) throw new Error("presign failed");
        const { presignedUrl, publicUrl, key } = await presignRes.json();
        const uploadRes = await fetch(presignedUrl, {
          method: "PUT", body: file, headers: { "Content-Type": file.type },
        });
        if (!uploadRes.ok) throw new Error("upload failed");
        results.push({ name: file.name, url: publicUrl, r2Key: key, size: file.size });
        setProgress(p => p.map((x, idx) => idx === i ? { ...x, status: "done" } : x));
      } catch {
        setProgress(p => p.map((x, idx) => idx === i ? { ...x, status: "error" } : x));
      }
    }
    setUploading(false);
    if (results.length) onUpload(results);
    setTimeout(() => setProgress([]), 2500);
  }, [folder, maxMB, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(multiple ? files : [files[0]]);
  }, [multiple, uploadFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(Array.from(e.target.files));
    }
    e.target.value = "";
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all duration-200 select-none",
          dragging
            ? "border-[#FF6B00] bg-[#FF6B00]/5"
            : uploading
            ? "border-[#E8E8E8] bg-[#F4F4F4] cursor-not-allowed"
            : "border-[#E8E8E8] hover:border-[#FF6B00] hover:bg-[#FFF8F4]"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          disabled={uploading}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "w-14 h-14 flex items-center justify-center transition-colors",
            dragging ? "bg-[#FF6B00] text-white" : "bg-[#F4F4F4] text-[#FF6B00]"
          )}>
            <IconUpload size={28} stroke={1.5} />
          </div>

          <div>
            <p className="font-body font-semibold text-sm text-[#0A0A0A]">
              {uploading ? "Uploading..." : dragging ? "Drop to upload" : label}
            </p>
            <p className="text-xs text-[#999] font-body mt-1">
              {hint ?? `${accept.replace("/*", "")} • max ${maxMB}MB${multiple ? " • multiple files" : ""}`}
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      {progress.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {progress.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 bg-[#F4F4F4]">
              <IconFile size={14} className="text-[#666] flex-shrink-0" stroke={1.5} />
              <span className="text-xs font-body text-[#444] flex-1 truncate">{f.name}</span>
              {f.status === "uploading" && (
                <div className="w-4 h-4 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              )}
              {f.status === "done" && <IconCheck size={14} className="text-green-500 flex-shrink-0" stroke={2.5} />}
              {f.status === "error" && <IconX size={14} className="text-red-500 flex-shrink-0" stroke={2.5} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
