import { getWebsiteContent } from "@/lib/cms";

export default async function Marquee() {
  const content = await getWebsiteContent();
  const tickerText = content.site.ticker_text;

  return (
    <div className="mt-[30px] origin-center scale-[1.04] -rotate-[1.4deg]">
      <div className="overflow-hidden border-y-[3px] border-green bg-green-dark py-[13px] text-cream">
        <div className="flex w-max animate-marquee font-bricolage text-[19px] font-bold">
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>
      <div className="overflow-hidden bg-accent py-[11px] text-white">
        <div className="flex w-max animate-marquee-rev font-bricolage text-[17px] font-bold opacity-96">
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>
    </div>
  );
}
