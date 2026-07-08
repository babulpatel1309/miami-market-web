import { getWebsiteContent } from "@/lib/cms";
import VisitSectionClient from "./VisitSectionClient";

export default async function VisitSection() {
  const content = await getWebsiteContent();
  const copy = content.visit;
  const contact = content.site.contact;
  const directionsUrl = content.site.directions_url;
  const mapEmbedUrl = content.site.map_embed_url;
  const structured = content.hours.structured;
  const initialStatus = content.hours.status;

  return (
    <VisitSectionClient
      copy={copy}
      contact={contact}
      directionsUrl={directionsUrl}
      mapEmbedUrl={mapEmbedUrl}
      structured={structured}
      initialStatus={initialStatus}
    />
  );
}
