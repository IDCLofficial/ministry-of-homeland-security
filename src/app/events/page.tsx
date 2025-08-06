import EventsListSection from "./EventsListSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { TopHero } from "@/components/TopHero";

export default function EventsPage() {
  const Events = [
    {
      date: "MAY 22, 2025",
      location: "IMO STATE HOUSE OF ASSEMBLY",
      title: "Vigilante Inclusion Law Signed",
      description:
        "Imo State Assembly officially amends the Security Organisation Law to include community vigilante groups under state supervision.",
      img: "/images/monsm-news2.webp",
      details: `The amendment empowers each of the 654 autonomous communities in the state to legally establish a fifteen‑man vigilante group. Over 9,800 vigilante personnel have now been recognized and integrated into the state's security framework, boosting grassroots security coverage and improving coordination with law enforcement.:contentReference[oaicite:1]{index=1}`,
      dateString: "2025-05-22T10:00:00",
    },

  ];

  return (
    <div className="bg-white">
      <TopHero
        ministryName="Ministry of Homeland Security & Vigilante Affairs"
        titleLabel="Events"
      />

      <EventsListSection events={Events} />

      <CTASection
        heading="Support Our Drive for Community Security"
        subtext="Join our efforts to integrate vigilante services, strengthen security coordination, and build safer communities across Imo State."
        buttonLabel="Contact Us"
        buttonHref="/contact-us"
      />

      <Footer />
    </div>
  );
}
