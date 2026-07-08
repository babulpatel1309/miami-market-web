import { getWebsiteContent } from "@/lib/cms";
import VisitSectionClient from "./VisitSectionClient";

export default async function VisitSection() {
  const { visit, site, hours } = await getWebsiteContent();

  return (
    <VisitSectionClient
      copy={visit}
      site={site}
      structuredHours={hours.structured}
      initialStatus={hours.status}
    />
  );
}
