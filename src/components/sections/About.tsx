/* eslint-disable @next/next/no-img-element */
import { getWebsiteContent } from "@/lib/cms";

export default async function About() {
  const { about } = await getWebsiteContent();

  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 pt-24 pb-[70px]">
      <div className="animate-reveal-view grid grid-cols-2 gap-3.5">
        {about.image1_url && (
          <img
            src={about.image1_url}
            alt="Miami Market sign"
            className="row-span-2 h-full min-h-[230px] w-full rounded-mm object-cover"
          />
        )}
        {about.image2_url && (
          <img
            src={about.image2_url}
            alt="Miami Market storefront"
            className="h-[165px] w-full rounded-mm object-cover"
          />
        )}
        {about.image3_url && (
          <img
            src={about.image3_url}
            alt="Award-winning deli"
            className="h-[165px] w-full rounded-mm object-cover"
          />
        )}
      </div>
      <div className="animate-reveal-view">
        <span className="font-bricolage text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">
          {about.eyebrow}
        </span>
        <h2 className="mt-3.5 font-bricolage text-[clamp(30px,4vw,48px)] leading-none font-extrabold tracking-tight text-green-dark">
          {about.heading}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          {about.paragraph1}
        </p>
        <p className="mt-3.5 text-lg leading-relaxed text-text-muted">
          {about.paragraph2}
        </p>
      </div>
    </section>
  );
}
