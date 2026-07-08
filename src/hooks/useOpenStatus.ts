"use client";

import { useEffect, useState } from "react";
import { ACCENT } from "@/constants/site";
import type { OpenStatus } from "@/types/status.types";
import type { WebsiteStatus, WebsiteStructuredHoursRow } from "@/lib/cms";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function isRowOpenNow(
  hours: WebsiteStructuredHoursRow[],
  day: number,
  serviceType: WebsiteStructuredHoursRow["service_type"],
  hourDecimal: number,
): { open: boolean; closeTime: string | null } {
  const row = hours.find((h) => h.day_of_week === day && h.service_type === serviceType);
  if (!row || row.is_closed || !row.open_time || !row.close_time) return { open: false, closeTime: null };
  const [openH, openM] = row.open_time.split(":").map(Number);
  const [closeH, closeM] = row.close_time.split(":").map(Number);
  const open = openH + openM / 60;
  const close = closeH + closeM / 60;
  return { open: hourDecimal >= open && hourDecimal < close, closeTime: row.close_time };
}

function formatHour12(hhmm: string | null): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const period = h >= 12 ? "PM" : "AM";
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

// Rules driven by structured hours rows instead of hardcoded time literals —
// the actual business rule (Deli & Drive-Thru Mon-Sat, Drive-Thru-only Sun)
// now lives in the backend's WebsiteHours table, editable from the admin panel.
export function computeStatus(hours: WebsiteStructuredHoursRow[], now: Date): OpenStatus {
  const day = now.getDay();
  const hourDecimal = now.getHours() + now.getMinutes() / 60;

  const deli = isRowOpenNow(hours, day, "deli", hourDecimal);
  const driveThru = isRowOpenNow(hours, day, "drive_thru", hourDecimal);

  let statusOpen: boolean;
  let statusLabel: string;
  let statusSub: string;

  if (deli.open) {
    statusOpen = true;
    statusLabel = "Open Now";
    statusSub = `Deli & Drive-Thru — open until ${formatHour12(deli.closeTime)} today`;
  } else if (driveThru.open) {
    statusOpen = true;
    statusLabel = "Drive-Thru Open";
    statusSub = `Open until ${formatHour12(driveThru.closeTime)} today`;
  } else {
    statusOpen = false;
    statusLabel = "Closed Right Now";
    const deliRow = hours.find((h) => h.day_of_week === day && h.service_type === "deli");
    if (day === 0) {
      const driveRow = hours.find((h) => h.day_of_week === 0 && h.service_type === "drive_thru");
      statusSub = `Drive-Thru opens Sunday at ${formatHour12(driveRow?.open_time ?? null)}`;
    } else if (deliRow && !deliRow.is_closed) {
      statusSub = `We open at ${formatHour12(deliRow.open_time)}`;
    } else {
      statusSub = "Please check back during business hours";
    }
  }

  return {
    statusOpen,
    statusLabel,
    statusSub,
    dayName: DAY_NAMES[day],
    signWord: statusOpen ? "OPEN" : "CLOSED",
    statusDot: statusOpen ? "#3DBE54" : ACCENT,
    todayIdx: day,
  };
}

/** Maps the backend's server-computed WebsiteStatus (from WEBSITE_TIMEZONE) to
 *  the client OpenStatus shape, used as the seed value before the 60s client tick. */
export function mapServerStatus(status: WebsiteStatus): OpenStatus {
  return {
    statusOpen: status.is_open_now,
    statusLabel: status.status_label,
    statusSub: status.status_sub,
    dayName: status.day_name,
    signWord: status.sign_word,
    statusDot: status.is_open_now ? "#3DBE54" : ACCENT,
    todayIdx: status.today_idx,
  };
}

/** Seeds from the server-computed `initial` value (no more hydration-mismatch
 *  flash, since the server already supplies a real value), then re-derives
 *  every 60s using the visitor's local clock against the same structured hours. */
export function useOpenStatus(
  hours: WebsiteStructuredHoursRow[],
  initial: OpenStatus | null,
): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(initial);

  useEffect(() => {
    const update = () => setStatus(computeStatus(hours, new Date()));
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [hours]);

  return status;
}
