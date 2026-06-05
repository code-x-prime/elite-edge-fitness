"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
            active === cat
              ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-[#0A0A0A]"
              : "border border-[#E5E5E5] text-[#444444] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
