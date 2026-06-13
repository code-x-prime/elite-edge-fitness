"use client";

import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { IconStar } from "@tabler/icons-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Gaurav Chhabra",
    role: "Medical Professional",
    quote: "Fantabulous. Amazing transformation journey. Ginieel's approach is scientific, motivating, and results-driven. Lost 18kg in 4 months while maintaining muscle. Highly recommend!",
    rating: 5,
  },
  {
    name: "Shashwat Singh",
    role: "Software Engineer",
    quote: "He is very inspirational and knows exactly how to push you beyond your limits. The personalized training program completely changed my physique. Best investment I've made.",
    rating: 5,
  },
  {
    name: "Monika Huparikar-Kalurkar",
    role: "Homemaker",
    quote: "I am getting trained by Ginieel for 6 months and the results are incredible. He understands women's fitness perfectly and creates programs that actually work.",
    rating: 5,
  },
  {
    name: "Megha Kataria",
    role: "Business Owner",
    quote: "Ginieel is very professional, knowledgeable and dedicated. His online training is as effective as in-person. Achieved my dream body while managing a busy schedule.",
    rating: 5,
  },
  {
    name: "Rahul Deshmukh",
    role: "IT Professional",
    quote: "The science behind every workout and diet plan is exceptional. Ginieel doesn't just train you — he educates you to understand your own body. Truly elite coaching.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Entrepreneur",
    quote: "From day one, the custom program felt designed exactly for me. No generic plans, no guesswork. Just results. 12kg down in 3 months and I feel stronger than ever.",
    rating: 5,
  },
  {
    name: "Arjun Patil",
    role: "Fitness Enthusiast",
    quote: "Contest prep with Ginieel was a completely different experience. His attention to detail on stage presentation and peak week strategy is unmatched in Pune.",
    rating: 5,
  },
  {
    name: "Sneha Joshi",
    role: "Teacher",
    quote: "I was skeptical about online coaching but Elite Edge proved me wrong. The WhatsApp support and weekly check-ins made me feel accountable and motivated every day.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "Corporate Professional",
    quote: "The diet plan alone transformed my energy levels at work. Combined with the training program, I've never felt this fit. 100% worth every rupee invested.",
    rating: 5,
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-[#FF6B00]",
  "bg-[#0A0A0A]",
  "bg-[#E55A00]",
  "bg-[#1A1A1A]",
  "bg-[#FF8C42]",
  "bg-[#333333]",
  "bg-[#FF6B00]",
  "bg-[#0A0A0A]",
  "bg-[#E55A00]",
];

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-14 md:py-16 px-4 bg-[#0A0A0A] overflow-hidden">
      {/* Bg glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
            / Voice of Satisfaction
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-white leading-none uppercase">
            Real Results,<br />
            <span className="text-[#FF6B00]">Real Stories</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, role, quote, rating }, index) => (
            <motion.div
              key={index}
              initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
              whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * index, duration: 0.6 }}
              className="relative grid grid-cols-[auto_1fr] gap-x-3 overflow-hidden border border-white/[0.08] hover:border-[#FF6B00]/40 p-5 transition-colors duration-300 group"
            >
              {/* Grid pattern overlay */}
              <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-white/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                  <GridPattern
                    width={25}
                    height={25}
                    x={-12}
                    y={4}
                    strokeDasharray="3"
                    className="stroke-white/10 absolute inset-0 h-full w-full mix-blend-overlay"
                  />
                </div>
              </div>

              {/* Orange glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.06), transparent 60%)" }}
              />

              {/* Avatar — initials */}
              <div
                className={`w-10 h-10 rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center flex-shrink-0 relative z-10`}
              >
                <span className="font-heading text-white text-sm leading-none">
                  {getInitials(name)}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-0.5">
                  <p className="text-white text-sm font-body font-semibold">{name}</p>
                  <span className="text-white/40 block text-[11px] font-light tracking-tight font-body">
                    {role}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mt-2 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <IconStar key={i} size={12} className="text-[#FF6B00] fill-[#FF6B00]" />
                  ))}
                </div>

                <blockquote>
                  <p className="text-white/60 text-sm font-light tracking-wide font-body leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
