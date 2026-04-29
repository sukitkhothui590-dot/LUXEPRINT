/**
 * พื้นหลัง hero แบบหน้าแรก — grid + wave + แถบซ้ายขวา (ใช้ร่วมกับ section ที่มี top offset เท่า navbar)
 */
export function HeroAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-0 hero-bg-grid md:top-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-[1] hero-wave-layer md:top-20"
        aria-hidden
      >
        <div className="hero-wave-band" />
        <div className="hero-wave-band hero-wave-band--b" />
        <div className="hero-wave-band hero-wave-band--c" />
        <div className="hero-wave-band hero-wave-band--d" />
        <div className="hero-wave-band hero-wave-band--e" />
        <div className="hero-wave-band hero-wave-band--f" />
      </div>
      <div
        className="pointer-events-none absolute top-16 bottom-0 left-0 z-[15] hidden w-[5vw] md:block"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-stone-100/50 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-px bg-stone-300/60" />
      </div>
      <div
        className="pointer-events-none absolute top-16 right-0 bottom-0 z-[15] hidden w-[5vw] md:top-20 md:block"
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-stone-100/50 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-stone-300/60" />
      </div>
    </>
  );
}
