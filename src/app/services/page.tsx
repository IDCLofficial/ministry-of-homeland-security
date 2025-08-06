import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import { TopHero } from "@/components/TopHero";
import ServicesGrid from "./ServiceCard";

const services = [
    {
      title: "Community-Based Vigilante Regulation",
      description:
        "Registration, oversight and code‑of‑conduct enforcement for community vigilante groups, ensuring compliance with state law.",
    },
    {
      title: "Joint Patrol & Security Checkpoints",
      description:
        "Collaboration with Ebube Agu and Nigeria Police to operate checkpoints and patrols targeting kidnapping, arms movement and communal clashes prevention.",
    },
    {
      title: "Intelligence Gathering & Local Liaison",
      description:
        "Facilitating community informant networks and inter-agency intelligence sharing to detect and prevent crime proactively.",
    },
    {
      title: "Training & Capacity Building",
      description:
        "Recruitment and training of Imo Security Organization officers and vigilante units for law enforcement, human rights and emergency response.",
    },
    {
      title: "Emergency Response Coordination",
      description:
        "Development of coordinated protocols for rapid response to security incidents and disasters, including distress call handling.",
    },
    {
      title: "Surveillance & Technology Deployment",
      description:
        "Installation of CCTV systems and surveillance infrastructure in key areas to monitor security threats and support investigations.",
    },
    {
      title: "Public Awareness & Sensitization",
      description:
        "Statewide campaigns to educate citizens on crime prevention, reporting mechanisms and fostering security‑conscious communities.",
    },
    {
      title: "Security Committees for Public Institutions",
      description:
        "Establishment of security committees in schools, worship centers and tertiary institutions to safeguard vulnerable locations.",
    },
    {
      title: "Stakeholder Partnership & Community Engagement",
      description:
        "Town hall meetings, interfaith councils and traditional leader engagement to mobilize community support for local security efforts.",
    },
  ];
  
export default function Services() {
    return (
        <div className="h-screen bg-white">
            
            {/* Top Hero */}
            <TopHero
                ministryName="What we do"
                titleLabel="Services"
            />
           <ServicesGrid services={services} />
            
            {/* CTASection */}
            <CTASection
          heading="Partner with Us for a Safer Imo State"
          subtext="Join our mission to ensure the safety, security, and well-being of all residents through effective vigilance, community engagement, and rapid response."
          buttonLabel="Contact Homeland Security"
          buttonHref="/contact-us"
      />
            {/* Footer */}
            <Footer />
        </div>
    )
}