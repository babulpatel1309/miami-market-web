import { TICKER_TEXT } from "@/constants/site";

export default function Marquee() {
  return (
    <div className="mt-[30px] origin-center scale-[1.04] -rotate-[1.4deg]">
      <div className="overflow-hidden border-y-[3px] border-green bg-green-dark py-[13px] text-cream">
        <div className="flex w-max animate-marquee font-bricolage text-[19px] font-bold">
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
        </div>
      </div>
      <div className="overflow-hidden bg-accent py-[11px] text-white">
        <div className="flex w-max animate-marquee-rev font-bricolage text-[17px] font-bold opacity-96">
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
        </div>
      </div>
    </div>
  );
}
