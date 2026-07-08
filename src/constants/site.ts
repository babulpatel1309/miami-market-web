// Single source of truth for brand tokens, contact details, links and nav.

// Brand tokens (used in Tailwind theme via globals.css @theme).
export const ACCENT = "#D2452A";
export const RADIUS = "16px";

export const CONTACT = {
  phone: "(513) 831-8646",
  phoneHref: "tel:15138318646",
  fax: "(513) 831-0222",
  addressLine1: "1296 State Route 131",
  addressLine2: "Milford, Ohio 45150",
  addressFull: "1296 State Route 131, Milford, Ohio 45150",
} as const;

export const NAV_LINKS = [
  { href: "#build", label: "Menu" },
  { href: "#hotplate", label: "Hot Plates" },
  { href: "#hours", label: "Hours" },
  { href: "#visit", label: "Visit" },
] as const;

export const SOCIAL_LINKS = [
  { href: "http://instagram.com/miamimarketmilford", label: "Instagram" },
  { href: "https://www.facebook.com/miamimarketmilford", label: "Facebook" },
  { href: "http://yelp.com/miami-market-milford", label: "Yelp" },
] as const;
