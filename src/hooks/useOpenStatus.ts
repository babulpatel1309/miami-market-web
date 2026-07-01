"use client";

import { useEffect, useState } from "react";
import { ACCENT } from "@/constants/site";
import type { OpenStatus } from "@/types/status.types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Deli & Drive-Thru run 10–8 Mon–Sat; the Drive-Thru also opens Sun 11–5.
export function computeStatus(now: Date): OpenStatus {
  const day = now.getDay();
  const hr = now.getHours() + now.getMinutes() / 60;
  const weekday = day >= 1 && day <= 6;
  const deliOpen = weekday && hr >= 10 && hr < 20;
  const dtOpen = (weekday && hr >= 10 && hr < 20) || (day === 0 && hr >= 11 && hr < 17);

  let statusOpen: boolean;
  let statusLabel: string;
  let statusSub: string;
  if (deliOpen) {
    statusOpen = true;
    statusLabel = "Open Now";
    statusSub = "Deli & Drive-Thru — open until 8 PM today";
  } else if (dtOpen) {
    statusOpen = true;
    statusLabel = "Drive-Thru Open";
    statusSub = "Open until " + (day === 0 ? "5 PM" : "8 PM") + " today";
  } else {
    statusOpen = false;
    statusLabel = "Closed Right Now";
    statusSub = day === 0 ? "Drive-Thru opens Sunday at 11 AM" : "We open at 10 AM";
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

// Returns null until mounted to avoid a server/client time mismatch, then
// recomputes every minute.
export function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus(new Date()));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return status;
}
