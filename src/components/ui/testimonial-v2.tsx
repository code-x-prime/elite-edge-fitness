"use client";

import React from 'react';
import { motion } from "framer-motion";

// --- Data ---
const firstColumn = [
  "/fallback-gallery/transformation-1.avif",
  "/fallback-gallery/transformation-2.avif",
  "/fallback-gallery/transformation-3.avif",
  "/fallback-gallery/transformation-4.avif",
  "/fallback-gallery/personal-1.avif",
  "/fallback-gallery/personal-2.avif",
];

const secondColumn = [
  "/fallback-gallery/transformation-5.avif",
  "/fallback-gallery/transformation-6.avif",
  "/fallback-gallery/transformation-7.avif",
  "/fallback-gallery/transformation-8.avif",
  "/fallback-gallery/personal-3.avif",
  "/fallback-gallery/personal-4.avif",
];

const thirdColumn = [
  "/fallback-gallery/transformation-9.avif",
  "/fallback-gallery/transformation-10.avif",
  "/fallback-gallery/transformation-11.avif",
  "/fallback-gallery/personal-5.avif",
  "/fallback-gallery/personal-6.avif",
  "/fallback-gallery/training-1.avif",
];

// --- Sub-Components ---
const GalleryColumn = (props: {
  className?: string;
  images: string[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.images.map((imgUrl, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.04,
                    y: -6,
                    borderColor: "rgba(255, 107, 0, 0.5)",
                    boxShadow: "0 25px 50px -12px rgba(255, 107, 0, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="relative aspect-square w-full max-w-[280px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111] transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center p-2" 
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt="Gallery item"
                    className="max-w-full max-h-full object-contain rounded-lg select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

// --- Main Section Component ---
export default function TestimonialV2() {
  return (
    <section 
      aria-labelledby="gallery-heading"
      className="bg-[#0A0A0A] py-20 relative overflow-hidden border-t border-white/[0.04]"
    >
      {/* Glow backgrounds */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }}
      />

      <div className="max-w-7xl px-4 z-10 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / Visual Journey
            </p>
            <h2 id="gallery-heading" className="font-heading text-5xl md:text-6xl text-white leading-none uppercase">
              Our <br />
              <span className="text-[#FF6B00]">Gallery</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm font-body leading-relaxed max-w-sm">
            Take a look at real body transformations, elite conditioning sessions, and milestones achieved by our community.
          </p>
        </div>

        {/* Scrolling Grid */}
        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[620px] overflow-hidden"
          role="region"
          aria-label="Scrolling Gallery"
        >
          <GalleryColumn images={firstColumn} duration={20} className="w-[280px]" />
          <GalleryColumn images={secondColumn} className="hidden md:block w-[280px]" duration={25} />
          <GalleryColumn images={thirdColumn} className="hidden lg:block w-[280px]" duration={22} />
        </div>
      </div>
    </section>
  );
}
