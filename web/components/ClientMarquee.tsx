type ClientMarqueeProps = {
  title: string;
  /** สำหรับ scroll spy หน้าแรก */
  id?: string;
};

const labels = [
  ["Brand 01", "Studio 02", "Creative 03"],
  ["Agency 04", "Fashion 05", "Global 06"],
  ["Retail 07", "Luxury 08", "Vision 09"],
] as const;

const cardClass =
  "flex h-28 w-48 shrink-0 items-center justify-center rounded-lg border border-stone-200/90 bg-stone-50 text-xl font-light uppercase tracking-widest text-stone-400 transition-colors hover:border-stone-400 hover:text-stone-800 sm:w-64 md:w-80";

export function ClientMarquee({ title, id }: ClientMarqueeProps) {
  return (
    <section
      id={id}
      className="overflow-hidden border-t border-stone-200/80 bg-white py-24"
    >
      <div className="mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          Our Clients
        </p>
        <h2 className="text-3xl font-normal text-stone-900">
          {title}
        </h2>
      </div>
      <div className="relative flex w-full flex-col space-y-6">
        <div className="w-full overflow-hidden">
          <div className="marquee-left space-x-6 px-3">
            {[...labels[0], ...labels[0]].map((label, i) => (
              <div key={`l1-${i}`} className={cardClass}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div
            className="marquee-right space-x-6 px-3"
            style={{ animationDuration: "45s" }}
          >
            {[...labels[1], ...labels[1]].map((label, i) => (
              <div key={`r1-${i}`} className={cardClass}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div
            className="marquee-left space-x-6 px-3"
            style={{ animationDuration: "35s" }}
          >
            {[...labels[2], ...labels[2]].map((label, i) => (
              <div key={`l2-${i}`} className={cardClass}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
