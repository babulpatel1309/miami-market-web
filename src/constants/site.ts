// Single source of truth for brand tokens, contact details, links and nav.

// Brand tokens (used in Tailwind theme via globals.css @theme).
export const ACCENT = "#D2452A";
export const RADIUS = "16px";

export const TICKER_TEXT =
  "  Famous Cranberry-Walnut Chicken Salad  ✦  Made From Scratch  ✦  Beer & Wine  ✦  Drive-Thru  ✦  Hot Plate Specials  ✦  Family Owned  ✦  Milford, Ohio  ✦";

export const CONTACT = {
  phone: "(513) 831-8646",
  phoneHref: "tel:15138318646",
  fax: "(513) 831-0222",
  addressLine1: "1296 State Route 131",
  addressLine2: "Milford, Ohio 45150",
  addressFull: "1296 State Route 131, Milford, Ohio 45150",
} as const;

export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir//Miami+Market,+Ohio+131,+Day+Heights,+OH/@39.1767974,-84.257077,13z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x884101d60d06055f:0xdb52e7411c491cbd!2m2!1d-84.2220576!2d39.1768026!3e0";

export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Miami+Market,+1296+State+Route+131,+Milford,+OH+45150&output=embed";

export const MENU_PDF_URL = "https://www.miami-market.com/s/2026-6.pdf";

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
