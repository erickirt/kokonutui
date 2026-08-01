const stats = [
  { value: "100+", label: "Components" },
  { value: "2k+", label: "GitHub Stars" },
  { value: "7+", label: "Templates" },
  { value: "100%", label: "Free & Open Source" },
] as const;

export default function StatsBar() {
  return (
    <section className="w-full border-black/[0.06] border-y py-12 dark:border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              className="flex flex-col items-center justify-center text-center"
              key={label}
            >
              <span className="bg-gradient-to-br from-black to-black/60 bg-clip-text font-bold text-4xl text-transparent sm:text-5xl dark:from-white dark:to-white/60">
                {value}
              </span>
              <span className="mt-2 text-black/60 text-sm dark:text-white/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
