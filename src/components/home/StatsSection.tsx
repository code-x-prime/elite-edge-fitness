"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeUp } from "@/components/ui/FadeUp";

const STATS = [
  { value: 13, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Happy Members" },
  { value: 20, suffix: "", label: "Skilled Trainers" },
  { value: 10, suffix: "K", label: "Calories Burned Daily" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-7xl md:text-8xl text-[#0A0A0A] leading-none tabular-nums">
      {count}
      <span className="text-[#FF6B00]">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-14 md:py-16 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#E8E8E8]">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center md:px-8 py-4">
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="font-body text-sm uppercase tracking-widest text-[#666] mt-3">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

