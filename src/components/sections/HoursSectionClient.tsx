"use client";

import { useOpenStatus } from "@/hooks/useOpenStatus";
import type { HoursCopyContent, OpenStatusContent, ScheduleRow, StructuredHourRow } from "@/lib/cms";

const headCell =
  "text-center font-bricolage text-xs font-extrabold tracking-[0.06em] text-text-muted-2 uppercase";

interface HoursSectionClientProps {
  copy: HoursCopyContent;
  schedule: ScheduleRow[];
  structuredHours: StructuredHourRow[];
  initialStatus: OpenStatusContent;
}

export default function HoursSectionClient({
  copy,
  schedule: scheduleRows,
  structuredHours,
  initialStatus,
}: HoursSectionClientProps) {
  const status = useOpenStatus(structuredHours, initialStatus);
  const signWord = status?.signWord ?? initialStatus.sign_word;
  const statusLabel = status?.statusLabel ?? initialStatus.status_label;
  const statusSub = status?.statusSub ?? initialStatus.status_sub;
  const dayName = status?.dayName ?? initialStatus.day_name;
  const todayIdx = status?.todayIdx ?? initialStatus.today_idx;
  const statusDot = status?.statusDot ?? initialStatus.status_dot;

  return (
    <section id="hours" className="bg-cream-dark py-[90px]">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="animate-reveal-view mb-[38px] text-center">
          <span className="font-bricolage text-[13px] font-extrabold tracking-[0.15em] text-accent uppercase">
            {copy.eyebrow}
          </span>
          <h2 className="mt-3 font-bricolage text-[clamp(32px,5vw,54px)] leading-none font-extrabold tracking-tight text-green-dark">
            {copy.heading}
          </h2>
        </div>

        <div className="grid grid-cols-[minmax(280px,0.85fr)_minmax(320px,1.4fr)] items-stretch gap-6">
          <div className="animate-reveal-view relative flex flex-col items-center justify-center overflow-hidden rounded-mm bg-green-darker px-[30px] py-[42px] text-center shadow-[0_30px_60px_-28px_rgba(0,0,0,0.7),inset_0_0_0_2px_rgba(123,214,140,0.14)]">
            <div
              className="pointer-events-none absolute inset-3.5 rounded-[calc(var(--radius-mm)-4px)] border-2 opacity-55"
              style={{ borderColor: statusDot }}
            />
            <span className="font-bricolage text-xs font-extrabold tracking-[0.32em] text-green-light uppercase">
              Miami Market
            </span>
            <div
              className="mt-3.5 font-bricolage text-[clamp(54px,8vw,84px)] leading-[0.9] font-extrabold tracking-wide"
              style={{ color: statusDot, textShadow: `0 0 26px ${statusDot}` }}
            >
              {signWord}
            </div>
            <div className="mt-5 flex items-center gap-2.5">
              <span className="relative h-[13px] w-[13px] shrink-0">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: statusDot }}
                />
                <span
                  className="absolute inset-0 animate-ping rounded-full"
                  style={{ background: statusDot }}
                />
              </span>
              <span className="font-bricolage text-lg font-extrabold text-cream">
                {statusLabel}
              </span>
            </div>
            <p className="mt-3.5 max-w-[30ch] text-[15px] text-text-muted-3">
              {statusSub}
            </p>
            <div className="mt-[22px] w-full border-t border-cream/16 pt-[18px]">
              <span className="font-bricolage text-[11px] font-bold tracking-[0.12em] text-green-light uppercase">
                Today is
              </span>
              <p className="mt-1 font-bricolage text-[22px] font-extrabold text-cream">
                {dayName}
              </p>
            </div>
          </div>

          <div className="animate-reveal-view rounded-mm bg-white p-[clamp(20px,2.6vw,30px)] shadow-[0_24px_46px_-26px_rgba(20,61,34,0.5)]">
            <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr] gap-2.5 border-b-2 border-green-dark/12 px-5 pb-3.5">
              <span className="font-bricolage text-xs font-extrabold tracking-[0.08em] text-text-muted-2 uppercase">
                Day
              </span>
              <span className={headCell}>Deli</span>
              <span className={headCell}>Drive-Thru</span>
              <span className={headCell}>Hot Plate</span>
            </div>
            <div className="mt-2 flex flex-col gap-0.5">
              {scheduleRows.map((r) => {
                const today = r.idx === todayIdx;
                return (
                  <div
                    key={r.day}
                    className={`grid grid-cols-[1.15fr_1fr_1fr_1fr] items-center gap-2.5 rounded-xl px-5 py-[15px] text-[15.5px] transition-colors duration-200 ${
                      today
                        ? "bg-accent text-white shadow-[0_10px_24px_-12px_#D2452A]"
                        : "text-[#2a3a2e]"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-[9px] font-bricolage text-[16.5px] font-extrabold ${today ? "text-white" : "text-green-dark"}`}
                    >
                      {r.day}
                      {today && (
                        <span className="rounded-full bg-white/25 px-[7px] py-0.5 text-[9.5px] font-extrabold tracking-[0.06em] text-white">
                          TODAY
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-center font-semibold ${today ? "text-white" : "text-text-muted"}`}
                    >
                      {r.deli}
                    </span>
                    <span
                      className={`text-center font-semibold ${today ? "text-white" : "text-text-muted"}`}
                    >
                      {r.drive}
                    </span>
                    <span
                      className={`text-center font-semibold ${today ? "text-white" : "text-text-muted"}`}
                    >
                      {r.hot}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-[18px] flex items-center gap-2 px-5 text-[13.5px] text-text-muted-2">
              <span className="h-[9px] w-[9px] shrink-0 rounded-[2px] bg-accent" />
              {copy.footer_note}
            </p>
          </div>
        </div>
        <p className="mt-[34px] text-center text-[15px] text-text-muted italic">
          {copy.holiday_disclaimer}
        </p>
      </div>
    </section>
  );
}
