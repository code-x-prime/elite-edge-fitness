"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FadeUp } from "@/components/ui/FadeUp";
import { IconHeart, IconMessageCircle, IconBrandInstagram, IconPlayerPlay } from "@tabler/icons-react";

// Swiper styles
import "swiper/css";

interface InstagramReel {
  id: number;
  imageUrl: string;
  views: string;
  likes: string;
  comments: string;
  caption: string;
}

const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    views: "18.4K",
    likes: "2.4K",
    comments: "142",
    caption: "Push your limits. Every single day. 💪🔥 #EliteEdge #FitnessGoals",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    views: "24.1K",
    likes: "3.8K",
    comments: "209",
    caption: "The grind never stops. Heavy session today! 🏋️‍♂️ #LegDay #Bodybuilding",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    views: "12.8K",
    likes: "1.9K",
    comments: "95",
    caption: "Speed and agility training with our expert coaches. ⚡ #Athletics #Fitness",
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
    views: "32.5K",
    likes: "5.2K",
    comments: "318",
    caption: "Consistency is key. What are you training today? 🤔 #GymMotivation",
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
    views: "15.9K",
    likes: "2.1K",
    comments: "110",
    caption: "Personalized coaching tailored to your lifestyle. 🤝 #EliteEdgeFitness",
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&auto=format&fit=crop",
    views: "21.0K",
    likes: "3.1K",
    comments: "180",
    caption: "Form checks and heavy pulls. Master the basics. 📈 #Deadlift #Coaching",
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    views: "19.3K",
    likes: "2.7K",
    comments: "156",
    caption: "Conditioning sessions that test your resolve. 🥊 #Cardio #Conditioning",
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600&auto=format&fit=crop",
    views: "27.5K",
    likes: "4.3K",
    comments: "250",
    caption: "Fueling the machine. Nutrition plans built for success. 🥗 #Health",
  },
  {
    id: 9,
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
    views: "14.2K",
    likes: "1.8K",
    comments: "88",
    caption: "Mobility and recovery. Don't skip the cool down! 🧘‍♂️ #Recovery",
  },
  {
    id: 10,
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    views: "30.1K",
    likes: "4.9K",
    comments: "297",
    caption: "We build champions. Join the elite squad today. 🔥 #EliteEdgeFitness09",
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/eliteedgefitness09?igsh=MW91c2lqbmp1amI2aQ==";

export default function InstagramCarousel() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-zinc-100">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <FadeUp>
            <div>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
                / INSTAGRAM FEED
              </p>
              <h2 className="font-heading text-4xl md:text-6xl text-zinc-950 leading-none uppercase">
                Elite Edge <br />On Instagram
              </h2>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-heading text-sm uppercase tracking-wider transition-all duration-300 rounded hover:shadow-[0_0_15px_rgba(255,107,0,0.3)]"
            >
              <IconBrandInstagram size={20} />
              Follow @eliteedgefitness09
            </a>
          </FadeUp>
        </div>

        {/* Carousel */}
        <FadeUp delay={0.2}>
          <div className="instagram-swiper-container">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              className="w-full"
            >
              {INSTAGRAM_REELS.map((reel) => (
                <SwiperSlide key={reel.id}>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative aspect-[9/16] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 hover:border-[#FF6B00]/70 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:hover:shadow-[0_8px_30px_rgba(255,107,0,0.15)]"
                  >
                    {/* Reel Thumbnail */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={reel.imageUrl}
                        alt={reel.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 transition-opacity duration-300" />
                    </div>

                    {/* Header info overlay (Instagram Icon) */}
                    <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/80 group-hover:text-[#FF6B00] transition-colors duration-300">
                      <IconBrandInstagram size={18} />
                    </div>

                    {/* Middle Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <IconPlayerPlay size={22} fill="white" />
                      </div>
                    </div>

                    {/* Footer information overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-white">
                      {/* Caption snippet */}
                      <p className="text-xs text-white/95 line-clamp-2 mb-3 font-body font-light">
                        {reel.caption}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-[11px] text-white/60 border-t border-white/10 pt-2.5">
                        <div className="flex items-center gap-1">
                          <IconHeart size={13} className="text-[#FF6B00]" fill="#FF6B00" />
                          <span>{reel.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconMessageCircle size={13} />
                          <span>{reel.comments}</span>
                        </div>
                        <div className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
                          {reel.views} views
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
