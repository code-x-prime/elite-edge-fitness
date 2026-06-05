"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { IconBarbell, IconTrophy, IconFlame, IconRun, IconStar, IconSparkles } from "@tabler/icons-react";

const DEMO_IMAGES = [
  { id: "1", category: "Training", title: "Morning Session", Icon: IconBarbell },
  { id: "2", category: "Dynamic Posing", title: "Stage Presence", Icon: IconTrophy },
  { id: "3", category: "Transformation", title: "12-Week Result", Icon: IconFlame },
  { id: "4", category: "Training", title: "Deadlift PR", Icon: IconBarbell },
  { id: "5", category: "Dynamic Posing", title: "Competition Day", Icon: IconStar },
  { id: "6", category: "Transformation", title: "Before & After", Icon: IconSparkles },
  { id: "7", category: "Training", title: "Cardio Blast", Icon: IconRun },
  { id: "8", category: "Dynamic Posing", title: "Lat Spread", Icon: IconTrophy },
  { id: "9", category: "Transformation", title: "6-Month Journey", Icon: IconFlame },
];

const CATEGORIES = ["Dynamic Posing", "Training", "Transformation"];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "All" ? DEMO_IMAGES : DEMO_IMAGES.filter((img) => img.category === active);

  return (
    <div>
      <div className="mb-8">
        <CategoryFilter categories={CATEGORIES} active={active} onChange={setActive} />
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img) => (
          <div
            key={img.id}
            onClick={() => setLightbox(img.id)}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden bg-[#F4F4F4] border border-[#E8E8E8] hover:border-[#FF6B00] transition-all duration-300"
          >
            <div
              className={`flex items-center justify-center bg-gradient-to-br from-[#F4F4F4] to-[#E0E0E0] ${
                parseInt(img.id) % 3 === 0 ? "h-64" : parseInt(img.id) % 2 === 0 ? "h-48" : "h-56"
              }`}
            >
              <img.Icon size={48} className="text-[#CCCCCC]" stroke={1} />
            </div>
            <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/70 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                <p className="text-white font-heading text-xl uppercase tracking-wide">{img.title}</p>
                <span className="text-[#FF6B00] text-xs uppercase tracking-widest font-body">{img.category}</span>
              </div>
            </div>
            <span className="absolute top-3 left-3 bg-[#FF6B00] text-white text-xs font-black uppercase tracking-wider px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-body">
              {img.category}
            </span>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl font-bold hover:text-[#FF6B00] transition-colors"
            onClick={() => setLightbox(null)}
          >
            &#x2715;
          </button>
          <div className="max-w-2xl w-full bg-[#F4F4F4] p-8 text-center">
            {(() => {
              const img = DEMO_IMAGES.find((i) => i.id === lightbox);
              if (!img) return null;
              return (
                <>
                  <img.Icon size={64} className="text-[#FF6B00] mx-auto mb-4" stroke={1.5} />
                  <p className="font-heading text-3xl uppercase text-[#0A0A0A]">{img.title}</p>
                  <p className="text-[#FF6B00] text-sm uppercase tracking-widest mt-2 font-body">{img.category}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
