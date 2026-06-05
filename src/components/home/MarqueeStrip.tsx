const TEXT =
  "DIET DESIGNING  •  BODY TRANSFORMATION  •  WEIGHT LOSS  •  SIX PACK PLANS  •  ONLINE TRAINING  •  BODY BUILDING  •  ENDURANCE WORKOUTS  •   ";

export default function MarqueeStrip() {
  return (
    <div className="bg-[#0A0A0A] overflow-hidden h-14 flex items-center border-y border-[#1F1F1F]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[TEXT, TEXT].map((t, i) => (
          <span
            key={i}
            className="font-heading text-xl text-[#FF6B00] tracking-widest px-4"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

