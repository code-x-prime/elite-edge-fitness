"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

function DownloadContent() {
  const params = useSearchParams();
  const token = params.get("token");

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">→</p>
        <h2 className="font-heading text-4xl uppercase text-[#0A0A0A] mb-4">Invalid Link</h2>
        <p className="text-[#444444] mb-8">No download token found. Check your email for the correct link.</p>
        <Button href="/contact" variant="outline">Contact Support</Button>
      </div>
    );
  }

  return (
    <div className="text-center py-20 max-w-xl mx-auto">
      <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B00] to-[#FF8C42] mx-auto mb-6 flex items-center justify-center">
        <span className="text-3xl">ðŸ“š</span>
      </div>
      <h2 className="font-heading text-5xl uppercase text-[#0A0A0A] mb-2">Your eBook</h2>
      <h3 className="font-heading text-3xl text-[#FF6B00] uppercase mb-6">Is Ready</h3>
      <p className="text-[#444444] mb-8">
        Thank you for your purchase! Click below to download your copy of{" "}
        <strong>The Ultimate Fat Loss Guide</strong>.
      </p>
      <a
        href={`/api/download/${token}`}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-[#0A0A0A] font-black uppercase tracking-widest px-10 py-5 hover:opacity-90 transition-opacity text-sm"
      >
        → Download PDF
      </a>
      <p className="text-xs text-[#444444] mt-6">
        Link valid for single download. Check your email for a permanent copy.
      </p>
      <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
        <Button href="/plans" variant="outline">Explore Training Plans</Button>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center text-[#444444]">Loading...</div>}>
          <DownloadContent />
        </Suspense>
      </div>
    </div>
  );
}




