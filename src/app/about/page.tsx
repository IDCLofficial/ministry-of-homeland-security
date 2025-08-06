import { SectionHero } from "@/components/SectionHero";
import { ObjectivesSection } from "@/app/about/ObjectivesSection";
import { StructuresSection } from "@/app/about/StructuresSection";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import { TopHero } from "@/components/TopHero";
import MissionVisionCard from "@/app/about/MissionVisionCard";
import TeamPage from "./Team";

// departments
const departments = {
  row1: [
    {
      title: "Department of Vigilante Coordination",
      description:
        "Registers, trains and deploys community-based vigilante groups across all autonomous communities in Imo State.",
    },
    {
      title: "Department of Intelligence & Surveillance",
      description:
        "Coordinates grassroots intelligence gathering, border patrols and surveillance to detect emerging threats.",
    },
    {
      title: "Department of Emergency Response & Civil Protection",
      description:
        "Leads rapid deployment teams during crises, security sensitization, and public awareness campaigns.",
    },
  ],
  row2: [
    {
      title: "Department of Inter‑Agency Liaison",
      description:
        "Facilitates collaboration with NSCDC, DSS, Police, Army and other security agencies on joint operations.",
    },
    {
      title: "Department of Policy, Strategy & Evaluation",
      description:
        "Develops security policies, monitors impact of programs, evaluates outcomes and ensures accountability.",
    },
  ],
};

// team
const teamMembers = [
    {
      name: "Hon. Osakwe",
      role: "Hon. Commissioner",
      image: "/images/commisioner.png",
      bio: "Oversees the ministry's strategic direction on homeland security, vigilante coordination, and community safety initiatives in alignment with state government policies."
    },
    {
      name: "Barr. Ihezue Samuel Chukwudi, Esq",
      role: "Permanent Secretary",
      image: "/images/permsec.jpg",
      bio: "Leads the administrative operations of the ministry, ensuring the effective implementation of homeland security policies, coordination with local enforcement agencies, and community engagement programs."
    },
  ];
  

// objectives
const objectives = [
  {
    title: "Zero‑Tolerance Security Posture",
    description:
      "Ensure border enforcement, tenant profiling, and surveillance to prevent infiltration of criminal elements into Imo State." // Feb 26, 2025 policy :contentReference[oaicite:2]{index=2}
  },
  {
    title: "Legal Recognition of Vigilante Groups",
    description:
      "Enact legislation to firmly integrate local vigilante groups into security frameworks in all 654 autonomous communities." // May 2025 amendment :contentReference[oaicite:3]{index=3}
  },
  {
    title: "Community-Based Intelligence Gathering",
    description:
      "Mobilize town‑unions, traditional rulers and residents in grassroots profiling and reporting suspicious activities." // townhouse profiling forms directive :contentReference[oaicite:4]{index=4}
  },
  {
    title: "Inter‑Agency Security Coordination",
    description:
      "Work alongside Imo State Police, CP command, DSS, NSCDC, Army and other agencies on unified security protocols." // June 2024 collaboration meeting :contentReference[oaicite:5]{index=5}
  },
  {
    title: "Accountability & Oversight",
    description:
      "Disband unauthorized vigilante outfits and enforce lawful operations through proper oversight and training." // June 2025 LG ban on unapproved groups :contentReference[oaicite:6]{index=6}
  },
];

// core values
const coreValues = [
  "Security",
  "Integrity",
  "Public Participation",
  "Professionalism",
  "Coordination",
  "Transparency",
];

export default function AboutUs() {
  return (
    <div className="h-screen bg-white">
      {/* Top Hero */}
      <TopHero
        ministryName="Ministry of Homeland Security and Vigilante Affairs"
        titleLabel="About Us"
      />

      {/* Section Hero */}
      <SectionHero
        aboutText={`Established in late 2021, the Ministry of Homeland Security and Vigilante Affairs is Imo State’s proactive response to rising insecurity. Under the leadership of the Hon. Commissioner, it directs community-based vigilance, intelligence-led operations, and emergency response systems.\n
The ministry works collaboratively with traditional rulers, town unions, and federal security agencies to secure every corner of the state, especially its 654 autonomous communities.\n
Through a combination of legal reform, public engagement, and inter‑agency coordination, the Ministry upholds safety, peace, and stability across Imo State.`}
        imgSrc="/images/vig1.png"
        altText="Security operations in Imo State"
      />

      {/* Mission & Vision Section */}
      <MissionVisionCard
        ministryName="Ministry of Homeland Security and Vigilante Affairs"
        state="Imo State"
        mission="To protect the lives and properties of Imo residents through rigorous grassroots vigilance, intelligence-led patrols, and partnership with security agencies."
        vision="A resilient Imo State where every community is secure, informed, and united in safeguarding peace."
      />

      {/* Team Section */}
      <TeamPage teamMembers={teamMembers} />

      {/* Objectives Section */}
      <ObjectivesSection
        objectives={objectives}
        coreValues={coreValues}
        ministryName="Ministry of Homeland Security and Vigilante Affairs"
      />

      {/* Structures Section */}
      <StructuresSection
        imgSrc="/images/building.png"
        description = "The Ministry of Homeland Security and Vigilante Affairs is committed to safeguarding lives and property through community policing, intelligence gathering, and proactive security interventions across Imo State."
        departments={departments}
      />

      {/* CTA Section */}
      <CTASection
        heading="Collaborate with us to strengthen security in Imo State"
        buttonLabel="See Our Security Initiatives"
        buttonHref="/services"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
