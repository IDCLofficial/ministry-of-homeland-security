import Image from "next/image";
import Link from 'next/link';

export default function SkillUpSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 py-8 px-4">
      {/* Left: Image Section */}
      <div className="w-[90%] md:w-[40%] flex items-stretch">
        <div className="relative w-full h-[300px] md:h-full min-h-[300px]">
          <Image src="/images/3R.png" alt="Homeland Security Patrol" fill className="object-cover rounded" />
        </div>
      </div>
      
      {/* Right: Text Section */}
      <div className="w-[90%] md:w-[55%] flex-1 flex flex-col justify-center items-start max-w-2xl px-2 min-h-0">
        <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Strengthening Security Through Vigilance and Community Collaboration
        </h2>
        <p className="text-gray-500 text-sm md:text-md lg:text-lg mb-8 max-w-[700px]">
          In line with the 3R Government Agenda, the Imo State Ministry of Homeland Security and Vigilante Affairs—
          under the leadership of Hon. Osakwe Abiazie Modestus—has intensified patrols, surveillance, and grassroots intelligence gathering to counter rising insecurity from neighboring regions. 
          <br /><br />
          Through border monitoring, community profiling, and the mandatory use of tenant acquaintance forms, the Ministry is ensuring that criminal elements find no refuge in Imo. With support from traditional rulers, town unions, and security operatives, the initiative strengthens checkpoints, demolishes criminal hideouts, and empowers residents to safeguard their communities. 
          <br /><br />
          The government assures citizens of its unwavering commitment to a safe and stable Imo where people can live and work without fear.
        </p>
        <div className="flex flex-row gap-4 mt-4 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/about" style={{ paddingTop: '.5rem', paddingBottom: '.5rem' }} className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-2 rounded text-lg transition-colors min-w-[140px] text-center">
            See More
          </Link>
          <Link href="/contact-us" style={{ paddingTop: '.5rem', paddingBottom: '.5rem' }} className="border border-green-700 text-green-700 font-semibold px-8 py-2 rounded text-lg hover:bg-green-50 transition-colors min-w-[160px] text-center">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
