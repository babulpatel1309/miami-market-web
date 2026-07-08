import { getWebsiteContent } from "@/lib/cms";
import HoursSectionClient from "./HoursSectionClient";

export default async function HoursSection() {
  const { hours } = await getWebsiteContent();

  return (
    <HoursSectionClient
      copy={hours.copy}
      schedule={hours.schedule}
      structuredHours={hours.structured}
      initialStatus={hours.status}
    />
  );
}
