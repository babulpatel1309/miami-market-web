// Shared cached loader for the backend's public website-content API.
// Every server component calls getWebsiteContent() independently — Next.js's
// fetch request memoization collapses identical calls to one network request
// per render, so sections stay self-contained (see web/CLAUDE.md §5) without
// needing page.tsx to fetch once and prop-drill.

export interface WebsiteContact {
  phone: string;
  phone_href: string;
  fax: string;
  address_line1: string;
  address_line2: string;
  address_full: string;
}

export interface WebsiteSeo {
  title: string;
  description: string;
}

export interface WebsiteSite {
  ticker_text: string;
  contact: WebsiteContact;
  directions_url: string;
  map_embed_url: string;
  menu_pdf_url: string;
  seo: WebsiteSeo;
}

export interface WebsiteNavLink {
  href: string;
  label: string;
}

export interface WebsiteSocialLink {
  href: string;
  label: string;
}

export interface WebsiteHero {
  badge_text: string;
  heading_line1: string;
  heading_line2: string;
  heading_line3: string;
  subcopy: string;
  image_url: string | null;
  floating_badge1_text: string;
  floating_badge2_text: string;
  cta_primary_label: string;
  cta_secondary_label: string;
}

export interface WebsiteAbout {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image1_url: string | null;
  image2_url: string | null;
  image3_url: string | null;
}

export interface WebsiteHotPlate {
  eyebrow: string;
  heading_line1: string;
  heading_accent: string;
  body: string;
  price_display: string;
  month_badge_label: string;
  image_url: string | null;
  served_label: string;
  rotating_badges: string[];
}

export interface WebsiteMenuCopy {
  eyebrow: string;
  heading: string;
  subcopy: string;
  deli_counter_eyebrow: string;
  deli_counter_heading: string;
  deli_counter_subcopy: string;
  build_divider_text: string;
  soups_heading: string;
  soups_body: string;
  hot_sandwiches_heading: string;
  hot_sandwiches_subheading: string;
}

export interface WebsiteMeat {
  name: string;
  price: number;
}

export interface WebsiteAddon {
  name: string;
  price_display: string;
}

export interface WebsiteHotSandwich {
  num: string;
  name: string;
  price_display: string;
  accent_price: boolean;
  description: string;
}

export interface WebsiteMenu {
  copy: WebsiteMenuCopy;
  meats: WebsiteMeat[];
  breads: string[];
  cheeses: string[];
  veggies: string[];
  addons: WebsiteAddon[];
  hot_sandwiches: WebsiteHotSandwich[];
  soup_sizes: string[];
}

export interface WebsiteHoursCopy {
  eyebrow: string;
  heading: string;
  footer_note: string;
  holiday_disclaimer: string;
}

export interface WebsiteScheduleRow {
  day_of_week: number;
  day_name: string;
  deli: string;
  drive_thru: string;
  hot_plate: string;
}

export type WebsiteServiceType = 'deli' | 'drive_thru' | 'hot_plate';

export interface WebsiteStructuredHoursRow {
  day_of_week: number;
  service_type: WebsiteServiceType;
  is_closed: boolean;
  open_time: string | null;
  close_time: string | null;
}

export interface WebsiteStatus {
  is_open_now: boolean;
  status_label: string;
  status_sub: string;
  day_name: string;
  sign_word: 'OPEN' | 'CLOSED';
  today_idx: number;
}

export interface WebsiteHours {
  copy: WebsiteHoursCopy;
  schedule: WebsiteScheduleRow[];
  structured: WebsiteStructuredHoursRow[];
  status: WebsiteStatus;
}

export interface WebsiteVisit {
  eyebrow: string;
  heading: string;
  find_us_label: string;
  feature_chip1: string;
  feature_chip2: string;
  feature_chip3: string;
}

export interface WebsiteContent {
  site: WebsiteSite;
  nav_links: WebsiteNavLink[];
  social_links: WebsiteSocialLink[];
  hero: WebsiteHero;
  about: WebsiteAbout;
  hot_plate: WebsiteHotPlate;
  menu: WebsiteMenu;
  hours: WebsiteHours;
  visit: WebsiteVisit;
}

const CMS_REVALIDATE_SECONDS = 300;

/**
 * Fetches the full website-content payload from the backend. Throws on any
 * failure (network error, non-2xx, malformed body).
 */
export async function getWebsiteContent(): Promise<WebsiteContent> {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000').replace(/\/$/, '');

  const res = await fetch(`${backendUrl}/api/v1/web/website-content`, {
    next: { revalidate: CMS_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`website-content fetch failed: ${res.status}`);
  }

  const body = (await res.json()) as { data: WebsiteContent };
  return body.data;
}
