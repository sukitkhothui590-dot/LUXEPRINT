import Image from "next/image";

type ClientMarqueeProps = {
  title: string;
  /** สำหรับ scroll spy หน้าแรก */
  id?: string;
};

const logos = [
  "/Our%20Clients/1%20(1).webp",
  "/Our%20Clients/2.webp",
  "/Our%20Clients/3.webp",
  "/Our%20Clients/4.webp",
  "/Our%20Clients/5.webp",
  "/Our%20Clients/6.webp",
  "/Our%20Clients/Untitled-1.png",
  "/Our%20Clients/8.webp",
] as const;

export function ClientMarquee({ title, id }: ClientMarqueeProps) {
  return (
    <section
      id={id}
      className="overflow-hidden border-t border-stone-200/70 bg-stone-50/40 py-20"
    >
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          Our Clients
        </p>
        <h2 className="break-words text-3xl font-normal text-stone-900">
          {title}
        </h2>
      </div>
      <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
        {logos.map((src, i) => (
          <div
            key={`client-${i}`}
            className="mx-auto flex min-w-0 w-[70%] max-w-full items-center justify-center"
          >
            <Image
              src={src}
              alt=""
              width={300}
              height={300}
              className="h-auto w-full rounded-lg object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
