import Image from "next/image";
import NewsHeroSection from "./NewsHeroSection";
import NewsBodySection from "./NewsBodySection";
import Footer from "@/components/Footer";

const latestNews = [
  {
    title: "Imo Ministry Declares Zero‑Tolerance for Criminal Infiltration",
    date: "26 February 2025",
    img: "/images/vig6.png",
  },
 
];

export default function NewsDetailPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FA]">
      {/* Section 1: Hero + Body */}
      <section className="relative w-full pb-[180px]">
        <NewsHeroSection />
        <NewsBodySection>
          {/* Title & Meta */}
          <div className="relative z-10 w-full flex justify-center pb-2">
            <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/vig2.png"
                alt="Security Patrol"
                width={900}
                height={400}
                className="object-cover w-full h-[260px] md:h-[320px]"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Ministry Declares Zero‑Tolerance Against Criminal Infiltration
            </h1>
            <p className="text-gray-500 text-sm">
              26 February 2025 • Security Alerts
            </p>
          </div>

          {/* Main Content */}
          <div className="px-4 md:px-0">
            <p className="text-gray-700 mb-6">
              The Imo State Ministry of Homeland Security and Vigilante Affairs, led by Hon. Osakwe Abiazie Modestus, has announced a zero‑tolerance policy toward criminal infiltration—targeting kidnappers, internet fraud syndicates, bandits, and occult-related criminal networks.
            </p>
            <p className="text-gray-700 mb-6">
              Security efforts have been stepped up in border areas through joint patrols, intelligence sharing, and collaborative surveillance between vigilante groups and security agencies. Grassroots profiling of tenants via “Acquaintance Forms” has also been enforced by Town Unions and Local Government Chairmen.
            </p>
            <p className="text-gray-700 mb-6">
              Violent penalties, including demolition of buildings found to harbour criminals, have been authorized as part of this enforcement strategy. Residents are urged to report suspicious persons confidentially, with town union leaders coordinating compliance across LGAs.
            </p>

            <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-800 mb-6">
              “Surveillance, patrols, and community-based intelligence efforts have been strengthened to ensure Imo remains impenetrable to criminals.” — Hon. Osakwe Abiazie Modestus
            </blockquote>

            <p className="text-gray-700 mt-6">
              The Ministry reaffirmed its commitment to working with community institutions, landlords, and traditional rulers to sustain law and order across all 654 autonomous communities in the state.
            </p>
          </div>
        </NewsBodySection>
      </section>

      {/* Section 2: Latest News */}
      <div className="w-full bg-[#181c23] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-white text-xl font-semibold mb-6">LATEST NEWS</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {latestNews.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#232323] rounded-xl overflow-hidden flex-1 min-w-[220px] max-w-xs"
              >
                <div className="relative w-full h-28">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-white text-xs font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-gray-400 text-[10px]">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
<Footer/>