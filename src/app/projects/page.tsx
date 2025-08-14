import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { TopHero } from "@/components/TopHero";
import OngoingProjects from "./ProjectCard";

export default function Projects() {
    return (
        <div>

            <TopHero
                ministryName="Driving Security and Environmental Stewardship"
                titleLabel="Projects"
            />

            {/* SkillUp Project */}
            <OngoingProjects />

            <CTASection
                heading="Join Us in Driving Security and Environmental Stewardship"
                subtext="Be part of our mission for safe, secure and protected Imo State for all residents through effective vigilance and community engagement."
                buttonLabel="Contact Us"
                buttonHref="/contact-us"
            />
            {/* Footer */}
            <Footer />

        </div>
    )
}