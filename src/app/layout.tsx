import type { Metadata } from "next";
import "./globals.css";
import favicon from "./image.png";
import { getSiteSettingsForMetadata } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettingsForMetadata();

  return {
    title: site.seo_title,
    description: site.seo_description,
    icons: {
      icon: favicon.src,
      apple: favicon.src,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
