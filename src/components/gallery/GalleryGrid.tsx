"use client";

import { useState, useEffect, useMemo } from "react";
import { IconChevronLeft, IconChevronRight, IconPlayerPlay, IconVideo } from "@tabler/icons-react";

interface GalleryItem {
  id: string;
  url: string;
  r2Key: string;
  title?: string | null;
  category: string;
  createdAt: string;
}

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "Transformation": "TRANSFORMATIONS",
  "Personal": "PERSONAL",
  "Training": "WORKOUT VIDEOS",
  "Gallery": "GALLERY FEED",
};

const FALLBACK_ITEMS: GalleryItem[] = [
  // Transformations
  {
    id: "f1",
    url: "/fallback-gallery/transformation-1.avif",
    r2Key: "",
    title: "Weight Loss Journey",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f2",
    url: "/fallback-gallery/transformation-2.avif",
    r2Key: "",
    title: "Back Definition Progress",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f3",
    url: "/fallback-gallery/transformation-3.avif",
    r2Key: "",
    title: "Midsection Toning",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f4",
    url: "/fallback-gallery/transformation-4.avif",
    r2Key: "",
    title: "Body Recomposition",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f5",
    url: "/fallback-gallery/transformation-5.avif",
    r2Key: "",
    title: "Muscle Gain Progression",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f6",
    url: "/fallback-gallery/transformation-6.avif",
    r2Key: "",
    title: "Biceps & Shoulder Definition",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f7",
    url: "/fallback-gallery/transformation-7.avif",
    r2Key: "",
    title: "Female Transformation Success",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f8",
    url: "/fallback-gallery/transformation-8.avif",
    r2Key: "",
    title: "Front Double Biceps Progress",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f9",
    url: "/fallback-gallery/transformation-9.avif",
    r2Key: "",
    title: "Overall Physique Improvement",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f10",
    url: "/fallback-gallery/transformation-10.avif",
    r2Key: "",
    title: "Peak Condition Posing",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },
  {
    id: "f11",
    url: "/fallback-gallery/transformation-11.avif",
    r2Key: "",
    title: "Full Body Recomp",
    category: "Transformation",
    createdAt: new Date().toISOString()
  },

  // Personal
  {
    id: "p1",
    url: "/fallback-gallery/personal-1.avif",
    r2Key: "",
    title: "Ginieel with Jay Cutler",
    category: "Personal",
    createdAt: new Date().toISOString()
  },
  {
    id: "p2",
    url: "/fallback-gallery/personal-2.avif",
    r2Key: "",
    title: "Outdoor Trainer Meetup",
    category: "Personal",
    createdAt: new Date().toISOString()
  },
  {
    id: "p3",
    url: "/fallback-gallery/personal-3.avif",
    r2Key: "",
    title: "Ginieel Posing in Europe",
    category: "Personal",
    createdAt: new Date().toISOString()
  },
  {
    id: "p4",
    url: "/fallback-gallery/personal-4.avif",
    r2Key: "",
    title: "Gym Shoot Posing",
    category: "Personal",
    createdAt: new Date().toISOString()
  },
  {
    id: "p5",
    url: "/fallback-gallery/personal-5.avif",
    r2Key: "",
    title: "Physique Modeling",
    category: "Personal",
    createdAt: new Date().toISOString()
  },
  {
    id: "p6",
    url: "/fallback-gallery/personal-6.avif",
    r2Key: "",
    title: "In-Gym Training Session",
    category: "Personal",
    createdAt: new Date().toISOString()
  },

  // Training
  {
    id: "t1",
    url: "/fallback-gallery/training-1.avif",
    r2Key: "",
    title: "Group Training Sessions",
    category: "Training",
    createdAt: new Date().toISOString()
  },
  {
    id: "t2",
    url: "/fallback-gallery/training-2.avif",
    r2Key: "",
    title: "Elderly Client Leg Press Guidance",
    category: "Training",
    createdAt: new Date().toISOString()
  },
  {
    id: "t3",
    url: "/fallback-gallery/training-3.avif",
    r2Key: "",
    title: "Lat Pulldown Execution Check",
    category: "Training",
    createdAt: new Date().toISOString()
  },
  {
    id: "t4",
    url: "/fallback-gallery/training-4.avif",
    r2Key: "",
    title: "Client Form Correction on Rower",
    category: "Training",
    createdAt: new Date().toISOString()
  },
  {
    id: "t5",
    url: "/fallback-gallery/training-5.avif",
    r2Key: "",
    title: "Coaching Client Group Training",
    category: "Training",
    createdAt: new Date().toISOString()
  }
];

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndices, setActiveIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to load gallery data", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Group items by category, fallback to FALLBACK_ITEMS when database is empty
  const groupedItems = useMemo(() => {
    const displayItems = items.length > 0 ? items : FALLBACK_ITEMS;
    const groups: Record<string, GalleryItem[]> = {};
    displayItems.forEach((item) => {
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [items]);

  // Handle active slide controls
  const handlePrev = (category: string, count: number) => {
    const currentIndex = activeIndices[category] ?? 0;
    const newIndex = currentIndex === 0 ? count - 1 : currentIndex - 1;
    setActiveIndices((prev) => ({ ...prev, [category]: newIndex }));
  };

  const handleNext = (category: string, count: number) => {
    const currentIndex = activeIndices[category] ?? 0;
    const newIndex = currentIndex === count - 1 ? 0 : currentIndex + 1;
    setActiveIndices((prev) => ({ ...prev, [category]: newIndex }));
  };

  const selectIndex = (category: string, index: number) => {
    setActiveIndices((prev) => ({ ...prev, [category]: index }));
  };

  if (loading) {
    return (
      <div className="space-y-12 py-10">
        {[1, 2].map((n) => (
          <div key={n} className="space-y-4 max-w-4xl mx-auto animate-pulse">
            <div className="h-6 w-48 bg-zinc-200 rounded" />
            <div className="aspect-video w-full bg-zinc-200 rounded-lg" />
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4, 5].map((t) => (
                <div key={t} className="w-24 h-16 sm:w-32 sm:h-20 bg-zinc-200 rounded flex-shrink-0" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If there are no items in both database and fallbacks, return null
  if (items.length === 0 && FALLBACK_ITEMS.length === 0) {
    return null;
  }

  return (
    <div className="space-y-20 py-6">
      {Object.entries(groupedItems).map(([category, catItems]) => {
        if (catItems.length === 0) return null;

        const displayName = CATEGORY_DISPLAY_NAMES[category] || category.toUpperCase();
        const activeIndex = activeIndices[category] ?? 0;
        const activeItem = catItems[activeIndex] || catItems[0];
        const isVideoActive = /\.(mp4|webm|ogg|mov|m4v)$/i.test(activeItem.url);

        return (
          <div key={category} className="max-w-4xl mx-auto space-y-6">
            {/* Category Header */}
            <div className="text-center">
              <h2 className="font-heading text-2xl md:text-3xl text-zinc-900 tracking-wider uppercase font-bold">
                {displayName}
              </h2>
              <div className="h-0.5 w-16 bg-[#FF6B00] mx-auto mt-2" />
            </div>

            {/* Main Stage Media Viewer */}
            <div className="relative group aspect-video w-full bg-black rounded-xl overflow-hidden border border-zinc-200 shadow-lg flex items-center justify-center">
              {isVideoActive ? (
                <video
                  key={activeItem.url}
                  src={activeItem.url}
                  controls
                  className="w-full h-full object-contain"
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeItem.url}
                  alt={activeItem.title || ""}
                  className="w-full h-full object-contain select-none"
                />
              )}

              {/* Prev Arrow */}
              {catItems.length > 1 && (
                <button
                  onClick={() => handlePrev(category, catItems.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm shadow-md"
                  aria-label="Previous media"
                >
                  <IconChevronLeft size={24} />
                </button>
              )}

              {/* Next Arrow */}
              {catItems.length > 1 && (
                <button
                  onClick={() => handleNext(category, catItems.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm shadow-md"
                  aria-label="Next media"
                >
                  <IconChevronRight size={24} />
                </button>
              )}

              {/* Title Overlay */}
              {activeItem.title && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 text-white text-sm font-body rounded inline-block max-w-max pointer-events-none">
                  {activeItem.title}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {catItems.length > 1 && (
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-zinc-300 select-none justify-start">
                  {catItems.map((item, idx) => {
                    const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(item.url);
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => selectIndex(category, idx)}
                        className={`relative w-24 h-16 sm:w-32 sm:h-20 flex-shrink-0 bg-zinc-100 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                          isActive
                            ? "border-[#FF6B00] scale-[1.02] shadow-md"
                            : "border-transparent hover:border-zinc-300"
                        }`}
                      >
                        {isVid ? (
                          <div className="relative w-full h-full">
                            <video src={item.url} className="w-full h-full object-cover pointer-events-none" muted playsInline />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                              <IconPlayerPlay size={16} fill="white" className="drop-shadow" />
                            </div>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt={item.title || ""}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        )}
                        
                        {/* Type indicators */}
                        {isVid && (
                          <span className="absolute top-1 right-1 bg-black/60 text-white p-0.5 rounded text-[8px]">
                            <IconVideo size={8} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
