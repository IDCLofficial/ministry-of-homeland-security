     export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalLoader from '@/components/GlobalLoader'
import Providers from "./providers";


export const metadata: Metadata = {
  title: "Ministry of Homeland Security and Vigilante Affairs",
  description: "The Ministry of Homeland Security and Vigilante Affairs in Imo State is responsible for overseeing and developing the state's security and vigilance sector, as well as managing community safety programs.",
};
  title: {
    default: 'Imo State Ministry of Homeland Security and Vigilante Affairs',
    template: '%s | Imo State Ministry of Homeland Security and Vigilante Affairs',
  },
  description: 'Official website of the Imo State Ministry of Homeland Security and Vigilante Affairs - overseeing and developing the state\'s security and vigilance sector, as well as managing community safety programs.',
  keywords: ['Imo State Security', 'Ministry of Homeland Security', 'Vigilante Affairs Imo', 'Community Safety Imo'],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://homesecurity.im.gov.ng',
    siteName: 'Imo State Ministry of Homeland Security and Vigilante Affairs',
    title: 'Imo State Ministry of Homeland Security and Vigilante Affairs',
    description: 'Official website of the Imo State Ministry of Homeland Security and Vigilante Affairs - overseeing and developing the state\'s security and vigilance sector, as well as managing community safety programs.',
    images: [
      {
        url: 'https://homesecurity.im.gov.ng/images/IMSG-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Imo State Ministry of Homeland Security and Vigilante Affairs',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "_7c1t_i-UsjS1_BD_kE-vsXMUak-mgMUnIT91dEUEQ4",
  },
}     

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <GlobalLoader />
<Providers>
        <Navbar/>
        {children}
</Providers>
      </body>
    </html>
  );
}
