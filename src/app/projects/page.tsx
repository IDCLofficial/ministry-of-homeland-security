import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { TopHero } from "@/components/TopHero";
import ProjectCard from "@/app/projects/ProjectCard";
import type { Project } from "@/app/projects/ProjectCard";

export default function Projects() {

  const projectsData: Project[] = [
    {
      title: "Community Policing & Neighborhood Watch Scheme",
      description:
        "Deployment of trained community security operatives across all LGAs to enhance local surveillance, crime prevention, and first responder capability.",
      status: "active",
    },
    {
      title: "Smart Surveillance Infrastructure Rollout",
      description:
        "Installation of CCTV cameras and drone monitoring systems in key urban centers to improve situational awareness and rapid incident response.",
      status: "active",
    },
    {
      title: "Emergency Response Command Center Establishment",
      description:
        "Launching a centralized emergency coordination hub to manage state-wide distress calls, coordinate rescue services, and dispatch homeland response units.",
      status: "active",
    },
    {
      title: "Inter-Agency Joint Security Taskforce Operations",
      description:
        "Operational collaboration with police, NSCDC, and other paramilitary agencies to secure borders, combat kidnapping, and address criminal flashpoints.",
      status: "active",
    },
    {
      title: "De-escalation & Conflict Mediation Workshops",
      description:
        "Community engagement workshops focused on peaceful dispute resolution, youth engagement, and intelligence gathering in volatile areas.",
      status: "closed",
    },
  ];

  const imagePaths = [
    "/images/media1.png",
    "/images/media2.png",
    "/images/media5.png",
  ];

  return (
    <div>
      <TopHero
        ministryName="Imo State Ministry of Homeland Security"
        titleLabel="Projects & Security Initiatives"
      />
      <ProjectCard projectlist={projectsData} images={imagePaths} />

      <CTASection
        heading="Partner with Us to Keep Imo State Safe"
        subtext="Join our mission to build a safer, smarter, and more resilient Imo through proactive security and rapid emergency response."
        buttonLabel="Contact the Ministry"
        buttonHref="/contact-us"
      />

      <Footer />
    </div>
  );
}
