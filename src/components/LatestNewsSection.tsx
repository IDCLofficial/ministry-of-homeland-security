import Image from "next/image";
import Link from "next/link";

const news = [
  {
    title: "Ministry Declares Zero‑Tolerance for Criminal Infiltration into Imo",
    description: "On February 26, 2025, Commissioner Hon. Osakwe Abiazie Modestus announced a zero‑tolerance policy against spillover of kidnappers, bandits, internet fraudsters and dark‑arts operatives into Imo State. Border surveillance, checkpoints, tenant profiling and intelligence at the grassroots have been intensified in collaboration with local unions and security agencies.","date":"26 February 2025",
    
    image:"/images/vig3.png",
  },
 
  {
    title: "Governor Orders Crackdown on Banditry with Vigilante Collaboration",
    description: "In a May 21, 2025 address, Governor Hope Uzodimma directed LG officials, traditional leaders and the Commissioner for Vigilante Services to collaborate closely to protect public infrastructure and suppress rising banditry and vandalism across the state.","date":"21 May 2025",
    image:"/images/vig1.png"
  },
  {
    title: "Assembly Urges Ministry to Crack Down on Scrap‑Metal ‘Scavengers’",
    description: "Following a motion advanced by Hon. Obinna Egu, the Assembly called on the Ministry, together with security agencies, to regulate and monitor scrap‑metal scavenging—which is associated with theft, spying and vandalism—arguing it poses a serious security risk across Imo State.","date":"18 September 2024",
    image:"/images/vig6.png"
  },
];

export default function LatestNewsSection() {
  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Latest News</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl justify-center mb-8">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col w-full max-w-md p-0 overflow-hidden transition hover:shadow-md"
          >
            <div className="w-full h-64 relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-t-2xl"
                sizes="400px"
                priority={idx === 0}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 tracking-tight uppercase">{item.title}</h3>
              <p className="text-gray-500 text-base mb-6">{item.description}</p>
              <div className="mt-auto font-bold text-black text-base">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/news">
        <p className="bg-green-700 animate-bounce hover:bg-green-800 text-white font-semibold px-12 py-3 rounded text-lg transition-colors text-center block">See More</p>
      </Link>
    </section>
  );
} 