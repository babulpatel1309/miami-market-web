/* eslint-disable @next/next/no-img-element */
import { getWebsiteContent } from "@/lib/cms";

export default async function Nav() {
  const { nav_links: navLinks, site } = await getWebsiteContent();

  return (
    <header className="sticky top-0 z-60 border-b border-green-dark/12 bg-cream/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-[18px] px-6 py-[13px]">
        <a href="#top" className="flex shrink-0 items-center no-underline">
          <img
            src="/images/logo.png"
            alt="Miami Market"
            className="block h-14 w-auto max-w-[min(220px,42vw)] object-contain object-left"
          />
        </a>
        <div className="flex flex-wrap items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-green-dark no-underline transition-colors duration-150 hover:bg-green/12"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.phone_href}
            className="ml-1.5 whitespace-nowrap rounded-full bg-green px-[18px] py-2.5 text-[15px] font-bold text-white no-underline transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-green-dark"
          >
            {site.phone}
          </a>
        </div>
      </nav>
    </header>
  );
}
