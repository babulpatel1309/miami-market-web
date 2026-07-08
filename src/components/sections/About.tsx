/* eslint-disable @next/next/no-img-element */

export default function About() {
  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-12 px-6 pt-24 pb-[70px]">
      <div className="animate-reveal-view grid grid-cols-2 gap-3.5">
        <img
          src="/images/sign.jpeg"
          alt="Miami Market sign"
          className="row-span-2 h-full min-h-[230px] w-full rounded-mm object-cover"
        />
        <img
          src="/images/storefront.jpeg"
          alt="Miami Market storefront"
          className="h-[165px] w-full rounded-mm object-cover"
        />
        <img
          src="/images/deli.jpeg"
          alt="Award-winning deli"
          className="h-[165px] w-full rounded-mm object-cover"
        />
      </div>
      <div className="animate-reveal-view">
        <span className="font-bricolage text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">
          Made From Scratch
        </span>
        <h2 className="mt-3.5 font-bricolage text-[clamp(30px,4vw,48px)] leading-none font-extrabold tracking-tight text-green-dark">
          A locally owned market &amp; deli
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          A locally operated and family owned business, we strive for the best
          in everything we do. From our deli counter to the drive-thru, every
          meal is made fresh.
        </p>
        <p className="mt-3.5 text-lg leading-relaxed text-text-muted">
          We also sell beer &amp; wine — both in the market and the drive-thru.
        </p>
      </div>
    </section>
  );
}
