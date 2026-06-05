"use client";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex-shrink-0 p-1 text-[#CCC] hover:text-[#FF6B00] transition-colors"
      title="Copy"
    >
      {copied ? <IconCheck size={14} className="text-green-500" stroke={2.5}/> : <IconCopy size={14} stroke={1.5}/>}
    </button>
  );
}
