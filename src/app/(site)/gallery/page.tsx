import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery ₹” Elite Edge Fitness",
};

export default function GalleryPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-xs">Visual Journey</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#0A0A0A] leading-none">
            GALLERY
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] mt-4 mb-6" />
          <p className="text-[#444444] max-w-xl">
            Real training. Real transformations. Real results. Every photo tells a story of dedication, discipline, and achievement.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
