import AboutMandateSection from "@/components/AboutMandateSection";
import HeroSection from "@/components/HeroSection";
import CommissionerSection from "@/components/CommissionerSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import SkillUpSection from "@/components/SkillUpSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import Stats from "@/components/Stats";
import FeaturedPartners from "@/components/FeaturedPartners";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>

     
      {/* hero section */}
      <HeroSection
        backgroundVideo="/video/vigilante.mp4"
        overlayText="Imo State Ministry of Homeland Security and Vigilante Affairs"
        heading="Securing Communities. "
        subheading="Protecting Citizens."
        description="Ensuring safety, coordinating vigilance, and protecting Imo citizens — through strategic security policies, community engagement, and rapid response programs."
      />
      {/* About Mandate Section */}
      <AboutMandateSection
        label="ABOUT US"
        title="Our Mandate —"
        subheading="Ministry of Homeland Security and Vigilante Affairs, Imo State"
        description="Welcome to the Imo State Ministry of Homeland Security and Vigilante Affairs. As a key driver of security transformation, our Ministry plays a critical role in positioning Imo State as a hub for security, vigilance, and public safety. In a time of post-oil diversification, we are committed to fostering sustainable development, attracting investment, and creating opportunities through a robust policy framework and forward-thinking leadership. Established through the restructuring of former security, vigilance, and community development departments, this Ministry brings focus to the vast opportunities in Imo's security landscape—vigilance, protection, and more."

        buttonText="Discover More"
        image1="/images/vig2.png"
        image2="/images/vig1.png"
      />

      {/* Commissioner Section */}
      <CommissionerSection
        imageSrc="/images/commisioner.png"
        imageAlt="Honourable Osakwe Abiazie Modestus"
        title="About The Commissioner"
        bio="Honourable Osakwe Abiazie Modestus is a respected statesman and a pillar of security reform in Imo State. Known for his unwavering dedication to public safety and civic responsibility, he has become a key force in repositioning Imo State as a model of proactive and people-centered security governance. A man of integrity and strategic vision, Hon. Osakwe brings a wealth of experience in conflict resolution, community engagement, and institutional transformation."

        details="Under his leadership, the Ministry of Homeland Security and Vigilante Affairs has evolved into a dynamic engine of security innovation—bridging the gap between government policy and grassroots protection. His collaborative work with local vigilante groups, law enforcement agencies, and international partners has not only strengthened security frameworks but also restored confidence in community-based vigilance. Hon. Osakwe's bold and intelligent approach reflects a deep commitment to protecting lives, fostering unity, and securing a peaceful future for all Imolites. His tenure is marked by courage, responsiveness, and an unshakable resolve to uphold peace and justice across the state."
/>        
      <div className="bg-white">

      {/* Skill Up Section */}
      <SkillUpSection />
      {/* Quick Links Section */}
      <QuickLinksSection />
      {/* Latest News Section */}
      <LatestNewsSection />
      </div>

      {/* Stats Section */}
      <Stats />
      {/* Featured Partners Section */}
      <FeaturedPartners />
      {/* CTASection */}
      <CTASection
        heading="Join Us in Securing Communities and Promoting Public Safety"
        subtext="Be part of our mission to create a safe, secure, and protected Imo State for all residents through effective vigilance and community engagement."
        buttonLabel="Contact Homeland Security"
        buttonHref="/contact-us"
      />
      {/* Footer */}
      <Footer />
    </>
  );
}
