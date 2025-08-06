import AnimatedSection from './AnimatedSection';
import { TypingText } from './TypingText';

interface HeroSectionProps {
  overlayText: string;
  heading: string;
  subheading: string;
  description: string;
  backgroundVideo: string; // updated from backgroundImage
}

export default function HeroSection({
  overlayText,
  heading,
  subheading,
  description,
  backgroundVideo,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen px-1 md:px-[3rem] flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 w-[96%] md:w-[100%] mx-auto px-6 flex flex-col items-start">
        <AnimatedSection>
          <div
            className="px-8 py-3 animate-fadeInUpDynamic flex justify-center text-xs lg:text-xl items-center bg-white text-gray-900 rounded-full font-semibold shadow-lg min-h-12"
          >
            {overlayText}
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.3} yOffset={100}>
          <h1
            className="animate-fadeInUpDynamic text-[30px] xl:text-[40px] 2xl:text-[62px] font-extrabold text-white leading-tight mb-4 mt-4"
          >
            {heading}<br />
            {subheading}<br />
            <TypingText />
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <p className="animate-fadeInUpDynamic text-white text-[16px] md:text-[20px] md:text-xl font-medium max-w-2xl ">
            {description}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
