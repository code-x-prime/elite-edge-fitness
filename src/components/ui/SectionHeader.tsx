interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({ eyebrow, title, center = false, light = false }: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-[#FF6B00] text-sm font-body font-bold uppercase tracking-[0.3em] mb-3">
        {eyebrow}
      </p>
      <h2 className={`font-heading text-5xl md:text-7xl leading-none ${light ? "text-white" : "text-[#0A0A0A]"}`}>
        {title}
      </h2>
      <div className={`h-1 w-16 bg-[#FF6B00] mt-4 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

