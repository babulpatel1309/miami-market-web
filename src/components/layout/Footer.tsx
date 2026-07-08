/* eslint-disable @next/next/no-img-element */
import { getWebsiteContent } from "@/lib/cms";

export default async function Footer() {
  const { site, social_links: socialLinks } = await getWebsiteContent();

  return (
    <footer className="bg-green-dark px-6 py-14 pb-10 text-text-light">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-8">
        <div>
          <img
            src="/images/logo.png"
            alt="Miami Market"
            className="block h-[62px] w-auto opacity-95 brightness-0 invert"
          />
          <p className="mt-4 text-[15px] leading-relaxed">
            {site.address_full}
            <br />
            {site.phone} · Fax {site.fax}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-cream/25 px-5 py-[11px] text-[15px] font-bold text-cream no-underline transition-colors duration-150 hover:bg-cream/10"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-9 max-w-[1140px] border-t border-cream/14 pt-6 text-sm opacity-70">
        © Miami Market · Milford, Ohio · Family owned &amp; locally operated
      </div>
    </footer>
  );
}
