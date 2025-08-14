import EventsListSection from "./EventsListSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { TopHero } from "@/components/TopHero";

export default function EventsPage() {
  return (
    <div className="bg-white">
      {/* top hero */}
      <TopHero ministryName="Safeguarding Communities" titleLabel="Events" />
      <EventsListSection />
      <CTASection
          heading="Join Us in Safeguarding Communities"
          subtext="Be part of our mission to create a safe and secure environment."
          buttonLabel="Contact Us"
          buttonHref="/contact-us"
      />
      <Footer />
    </div>
  );
}
