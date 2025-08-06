import UnitsTabsSection from "./UnitsTabsSection";
import Footer from "@/components/Footer";
import { TopHero } from "@/components/TopHero";
import CTASection from "@/components/CTASection";

const departmentsData = [
  {
    name: "Department of Security Operations & Coordination",
    image: "/images/vig1.png",
    description:
      "Coordinates joint security efforts between the state government, vigilante groups, and federal law enforcement agencies to maintain internal peace and order.",
  },
  {
    name: "Department of Vigilante Services",
    image: "/images/vig2.png",
    description:
      "Supervises and trains local vigilante groups, ensuring standardized procedures, intelligence sharing, and lawful operations within communities.",
  },
  {
    name: "Department of Intelligence and Surveillance",
    image: "/images/vig3.png",
    description:
      "Gathers actionable intelligence, monitors emerging threats, and provides real-time security reports to prevent criminal activity.",
  },
  {
    name: "Department of Emergency Response & Disaster Management",
    image: "/images/vig4.png",
    description:
      "Leads crisis response efforts including natural disasters, civil unrest, and public safety emergencies across the state.",
  },
  {
    name: "Department of Administration, Planning & Logistics",
    image: "/images/vig6.png",
    description:
      "Manages internal administration, resource planning, security logistics, and inter-agency communication for efficient ministry operations.",
  },
];

export default function UnitsPage() {
  return (
    <div className="bg-white">
      <TopHero
        ministryName="Ministry of Homeland Security & Vigilante Affairs"
        titleLabel="Departments"
      />

      <UnitsTabsSection departments={departmentsData} />

      <CTASection
        heading="Partner With Us to Safeguard Imo Communities"
        subtext="Support our mission to ensure security, prevent crime, and build community resilience across all Local Government Areas."
        buttonLabel="Reach Out to the Ministry"
        buttonHref="/contact-us"
      />
      <Footer />
    </div>
  );
}
