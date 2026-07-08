export interface HeroContent {
  badge_text: string;
  heading_line1: string;
  heading_line2: string;
  heading_line3: string;
  subheadline: string;
  image_url: string | null;
}

export interface WebsiteContent {
  hero: HeroContent;
}

function getBackendUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not set');
  }
  return url.replace(/\/$/, '');
}

/** No fallback data — a failed fetch throws and fails the render. */
export async function getWebsiteContent(): Promise<WebsiteContent> {
  const res = await fetch(`${getBackendUrl()}/api/v1/web/website-content`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status}`);
  }

  const body = await res.json();
  return body.data as WebsiteContent;
}
