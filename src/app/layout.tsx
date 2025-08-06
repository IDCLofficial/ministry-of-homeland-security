import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalLoader from '@/components/GlobalLoader'



export const metadata: Metadata = {
  title: "Ministry of Homeland Security and Vigilante Affairs",
  description: "The Ministry of Homeland Security and Vigilante Affairs in Imo State is responsible for overseeing and developing the state's security and vigilance sector, as well as managing community safety programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <GlobalLoader />

        <Navbar/>
        {children}
      </body>
    </html>
  );
}
