import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const meta = {
  title: "필기깎는화석 | Chronos",
  description: "역사 연표자료 및 필기노트 검색 서비스",
  url: "https://chronos.jiwoo.best/",
  img: ['https://chronos.jiwoo.best/ver1.5_OccupationSummary.webp', 'https://chronos.jiwoo.best/fossilLogo.png'],
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,  
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: meta.title,
    images: [
      {
        url: meta.img[0],
        width: 800,
        height: 600,
      },
      {
        url: meta.img[1],
        width: 600,
        height: 1600,
        alt: "fossilLogo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
