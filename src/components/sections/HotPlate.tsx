/* eslint-disable @next/next/no-img-element */
import { getWebsiteContent } from "@/lib/cms";

export default async function HotPlate() {
  const { hot_plate: hotPlate, menu } = await getWebsiteContent();
  const sideChips = menu.soup_sizes.map((s, i) =>
    i === 0 ? `Sides · ${s}` : s
  );

  return (
    <section
      id="hotplate"
      className="relative mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-16 px-6 py-26"
    >
      <span className="pointer-events-none absolute top-[30px] right-2 z-0 font-bricolage text-[clamp(90px,16vw,210px)] leading-none font-extrabold tracking-[-0.05em] text-green-dark/4">
        {hotPlate.price_label}
      </span>
      <div className="animate-reveal-view relative z-2">
        <span className="font-bricolage text-[13px] font-extrabold tracking-[0.13em] text-accent uppercase">
          {hotPlate.eyebrow}
        </span>
        <h2 className="mt-3.5 font-bricolage text-[clamp(32px,4.5vw,54px)] leading-[0.98] font-extrabold tracking-tight text-green-dark">
          {hotPlate.heading_prefix}{" "}
          <span className="text-accent">{hotPlate.heading_accent}</span>
        </h2>
        <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-text-muted">
          {hotPlate.description}
        </p>
        <div className="mt-[22px] flex flex-wrap gap-2.5 font-bricolage font-bold text-green-dark">
          {sideChips.map((s) => (
            <span
              key={s}
              className="rounded-full bg-green/12 px-4 py-2.5"
            >
              {s}
            </span>
          ))}
        </div>
        {hotPlate.menu_pdf_url && (
          <a
            href={hotPlate.menu_pdf_url}
            target="_blank"
            rel="noopener"
            className="mt-[30px] inline-block rounded-mm bg-green px-7 py-[15px] text-base font-bold text-white no-underline transition-[background,transform] duration-150 hover:-translate-y-0.5 hover:bg-green-dark"
          >
            {hotPlate.cta_label}
          </a>
        )}
      </div>

      <div className="animate-reveal-view relative z-2 px-[18px] pt-[30px]">
        <div className="relative mx-auto max-w-[430px] -rotate-[2.5deg] rounded bg-white px-3.5 pt-3.5 pb-[50px] shadow-[0_34px_64px_-26px_rgba(20,61,34,0.55)]">
          <div className="absolute -top-3 left-1/2 z-5 -translate-x-1/2 -rotate-2 rounded-[3px] bg-green-dark px-4 py-1.5 font-bricolage text-xs font-extrabold tracking-[0.14em] text-cream uppercase">
            {hotPlate.badge_label}
          </div>
          <div className="absolute top-1.5 -right-3.5 h-[26px] w-[74px] rotate-[38deg] bg-gold/55 shadow-[0_2px_6px_rgba(0,0,0,0.1)]" />
          <div className="absolute bottom-[34px] -left-4 h-[26px] w-[74px] rotate-[34deg] bg-accent/40 shadow-[0_2px_6px_rgba(0,0,0,0.1)]" />
          {hotPlate.image_url && (
            <img
              src={hotPlate.image_url}
              alt="This month's hot plate special menu"
              className="relative block w-full border border-green-dark/8"
            />
          )}
          <p className="mt-3.5 text-center font-bricolage text-sm font-bold text-text-muted">
            {hotPlate.image_caption}
          </p>
        </div>
        <div className="absolute -top-1.5 -left-1.5 z-6 aspect-square w-[clamp(118px,14vw,158px)] drop-shadow-[0_12px_22px_rgba(20,61,34,0.35)]">
          <div className="absolute inset-0 animate-spin-slower rounded-full bg-[repeating-conic-gradient(#D2452A_0deg_9deg,#e86a52_9deg_18deg)]" />
          <div className="absolute inset-[13%] flex flex-col items-center justify-center rounded-full bg-green-dark text-center text-cream shadow-[inset_0_0_0_2px_rgba(250,244,232,0.25)]">
            <span className="font-bricolage text-[11px] font-extrabold tracking-[0.22em] text-green-light">
              {hotPlate.circle_top_label}
            </span>
            <span className="font-bricolage text-[clamp(34px,5vw,52px)] leading-[0.85] font-extrabold">
              {hotPlate.price_label}
            </span>
            <span className="font-bricolage text-[9px] font-bold tracking-[0.16em] text-text-light">
              {hotPlate.circle_bottom_label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
