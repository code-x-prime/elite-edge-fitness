const stats = [
  { number: "13+", label: "Years Experience" },
  { number: "500+", label: "Happy Members" },
  { number: "20", label: "Skilled Trainers" },
  { number: "10K", label: "Calories Burned Daily" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0A0A0A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-gray-800">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:px-8">
              <p className="font-heading text-5xl md:text-6xl text-[#FF6B00] leading-none mb-2">
                {stat.number}
              </p>
              <p className="text-white uppercase tracking-widest text-xs font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
