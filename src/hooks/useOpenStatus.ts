"use client";

import { useEffect, useState } from "react";
import type { OpenStatusContent, StructuredHourRow } from "@/lib/cms";
import { computeWebsiteStatus } from "@/lib/compute-website-status";
import type { OpenStatus } from "@/types/status.types";

function mapServerStatus(initial: OpenStatusContent): OpenStatus {
  return {
    statusOpen: initial.is_open_now,
    statusLabel: initial.status_label,
    statusSub: initial.status_sub,
    dayName: initial.day_name,
    signWord: initial.sign_word,
    statusDot: initial.status_dot,
    todayIdx: initial.today_idx,
  };
}

function mapComputedStatus(status: OpenStatusContent): OpenStatus {
  return {
    statusOpen: status.is_open_now,
    statusLabel: status.status_label,
    statusSub: status.status_sub,
    dayName: status.day_name,
    signWord: status.sign_word,
    statusDot: status.status_dot,
    todayIdx: status.today_idx,
  };
}

export function useOpenStatus(
  structuredHours: StructuredHourRow[],
  initial: OpenStatusContent,
): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(() =>
    mapServerStatus(initial),
  );

  useEffect(() => {
    const update = () => {
      if (structuredHours.length > 0) {
        setStatus(mapComputedStatus(computeWebsiteStatus(structuredHours)));
      } else {
        setStatus(mapServerStatus(initial));
      }
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [structuredHours, initial]);

  return status;
}
