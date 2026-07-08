import { getWebsiteContent } from "@/lib/cms";

interface MeatRowData {
  name: string;
  price: number;
}

function MeatRow({ meat }: { meat: MeatRowData }) {
  return (
    <div className="flex items-baseline gap-2 border-b border-green-dark/7 py-2">
      <span className="font-semibold">{meat.name}</span>
      <span className="flex-1 -translate-y-[5px] border-b-2 border-dotted border-green-dark/26" />
      <span className="font-bricolage font-extrabold text-accent">
        ${meat.price.toFixed(2)}
      </span>
    </div>
  );
}

function BuildGroup({
  title,
  items,
  addOns,
}: {
  title: string;
  items: string[];
  addOns?: { name: string; price: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3.5 font-bricolage text-[13px] font-extrabold tracking-[0.1em] text-green-dark uppercase">
        {title}
      </h4>
      <div className="flex flex-wrap gap-[7px]">
        {items.map((i) => (
          <span
            key={i}
            className="rounded-full bg-green/10 px-3 py-1.5 text-[13.5px]"
          >
            {i}
          </span>
        ))}
        {addOns?.map((a) => (
          <span
            key={a.name}
            className="rounded-full bg-gold/28 px-3 py-1.5 text-[13.5px] font-bold"
          >
            {a.name} {a.price}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function MenuSection() {
  const content = await getWebsiteContent();
  const copy = content.menu.copy;
  const meats: MeatRowData[] = content.menu.meats;
  const breads = content.menu.breads;
  const cheeses = content.menu.cheeses;
  const veggies = content.menu.veggies;
  const veggieAddOns = content.menu.addons.map((a) => ({ name: a.name, price: a.price_display }));
  const hotSandwiches = content.menu.hot_sandwiches.map((h) => ({
    num: h.num,
    name: h.name,
    price: h.price_display,
    accentPrice: h.accent_price,
    desc: h.description,
  }));
  const soupSizes = content.menu.soup_sizes;

  return (
    <section id="build" className="bg-green-dark py-[90px] text-cream">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="animate-reveal-view mx-auto mb-[50px] max-w-[660px] text-center">
          <span className="font-bricolage text-[13px] font-extrabold tracking-[0.16em] text-green-light uppercase">
            {copy.eyebrow}
          </span>
          <h2 className="mt-3.5 font-bricolage text-[clamp(34px,5.4vw,62px)] leading-[0.98] font-extrabold tracking-tight">
            {copy.heading}
          </h2>
          <p className="mt-[18px] text-[17px] leading-normal text-text-light">{copy.subcopy}</p>
        </div>

        <div className="animate-reveal-view relative mx-auto max-w-[980px] rounded-[calc(var(--radius-mm)+4px)] border border-[#e3d6b4] bg-cream-paper p-[clamp(30px,4.5vw,56px)] text-green-dark shadow-[0_44px_84px_-36px_rgba(0,0,0,0.62)]">
          <div className="pointer-events-none absolute inset-[13px] rounded-mm border-[1.5px] border-green-dark/16" />
          <div className="relative">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3.5 text-accent">
                <span className="h-[1.5px] w-[42px] bg-current opacity-50" />
                <span className="font-bricolage text-xs font-extrabold tracking-[0.3em] uppercase">
                  {copy.deli_counter_eyebrow}
                </span>
                <span className="h-[1.5px] w-[42px] bg-current opacity-50" />
              </div>
              <h3 className="mt-3.5 font-bricolage text-[clamp(26px,3.6vw,40px)] font-extrabold tracking-tight">
                {copy.deli_counter_heading}
              </h3>
              <p className="mt-[9px] text-[14.5px] text-text-muted-2 italic">{copy.deli_counter_subcopy}</p>
            </div>

            <div className="mt-[34px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-11 gap-y-0.5">
              {meats.map((m) => (
                <MeatRow key={m.name} meat={m} />
              ))}
            </div>

            <div className="my-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-green-dark/18" />
              <span className="font-bricolage text-xs font-extrabold tracking-[0.26em] text-accent uppercase">
                {copy.build_divider_text}
              </span>
              <span className="h-px flex-1 bg-green-dark/18" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[26px]">
              <BuildGroup title="Breads" items={breads} />
              <BuildGroup title="Cheeses" items={cheeses} />
              <BuildGroup
                title="Veggies & Condiments"
                items={veggies}
                addOns={veggieAddOns}
              />
            </div>
          </div>
        </div>

        <div className="animate-reveal-view mt-[34px] flex flex-wrap items-center justify-between gap-5 rounded-mm bg-accent p-[30px]">
          <div>
            <h3 className="m-0 font-bricolage text-[28px] font-extrabold text-white">{copy.soups_heading}</h3>
            <p className="mt-2 text-base text-white/92">{copy.soups_body}</p>
          </div>
          <div className="flex flex-wrap gap-2.5 font-bricolage font-bold text-white">
            {soupSizes.map((s) => (
              <span
                key={s}
                className="rounded-full bg-black/18 px-4 py-2.5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-reveal-view relative mt-[70px]">
          <span className="pointer-events-none absolute -top-[52px] -left-0.5 font-bricolage text-[clamp(70px,13vw,160px)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-cream/5">
            GRILLED
          </span>
          <h3 className="relative m-0 font-bricolage text-[clamp(26px,3.5vw,40px)] font-extrabold text-cream">
            {copy.hot_sandwiches_heading}
          </h3>
          <p className="relative mt-2 text-[13px] font-bold tracking-[0.08em] text-green-light uppercase">
            {copy.hot_sandwiches_subheading}
          </p>
        </div>
        <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[18px]">
          {hotSandwiches.map((h) => (
            <div
              key={h.num}
              className="animate-reveal-view relative overflow-hidden rounded-mm border-t-4 border-accent bg-cream px-6 pt-[26px] pb-6 text-green-dark transition-[transform,box-shadow] duration-200 hover:-translate-y-[7px] hover:shadow-[0_26px_46px_-22px_rgba(0,0,0,0.6)]"
            >
              <span className="pointer-events-none absolute right-3.5 -bottom-[18px] font-bricolage text-[98px] leading-none font-extrabold text-green-dark/6">
                {h.num}
              </span>
              <span
                className={`absolute top-[18px] right-[18px] rounded-full px-[13px] py-[7px] font-bricolage text-[15px] font-extrabold ${
                  h.accentPrice
                    ? "bg-accent text-white"
                    : "bg-green-dark text-cream"
                }`}
              >
                {h.price}
              </span>
              <h4 className="relative mt-0.5 max-w-[74%] font-bricolage text-[23px] font-extrabold">
                {h.name}
              </h4>
              <p className="relative mt-2.5 text-[15.5px] leading-snug text-text-muted">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
