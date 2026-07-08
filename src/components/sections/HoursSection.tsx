import { getWebsiteContent } from "@/lib/cms";
import HoursSectionClient from "./HoursSectionClient";

export default async function HoursSection() {
  const content = await getWebsiteContent();
  const copy = content.hours.copy;
  const schedule = content.hours.schedule;
  const structured = content.hours.structured;
  const initialStatus = content.hours.status;

  return (
    <HoursSectionClient copy={copy} schedule={schedule} structured={structured} initialStatus={initialStatus} />
  );
}
