'use client';

import React, { useState } from "react";
import MediaHeroSection from "./MediaHeroSection";
import MediaGalleryGrid from "./MediaGalleryGrid";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import MediaSearchBar from "./MediaSearchBar";

const mediaItems = [
  {
    image: "/images/vig2.png",
    title: "Statewide Vigilante Training Session at Avu",
    isVideo: false,
  },
  {
    image: "/images/media2.png",
    title: "Community Security Townhall Meeting in Orlu Zone",
    isVideo: false,
  },
  {
    image: "/images/media1.png",
    title: "Launch of New Patrol Vehicles for Local Vigilante Units",
    isVideo: false,
  },
  {
    image: "/images/media5.png",
    title: "Commissioner Speaks on Grassroots Policing Strategies",
    isVideo: false,
  },
];

export default function MediaPage() {
  const [search, setSearch] = useState("");

  const filteredItems = mediaItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen w-full bg-[#F7F9FA] flex flex-col">
      <MediaHeroSection
        title="See Homeland Security in Action"
        subtitle="Explore our gallery of events, townhalls, and patrol operations showcasing our efforts to secure Imo State."
        backgroundImage="/images/gradient.png"
        searchBar={<MediaSearchBar placeholder="Search media..." onSearch={setSearch} />}
      />
      
      <section className="w-full max-w-7xl mx-auto py-12 px-4">
        <div className="mt-8">
          {filteredItems.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-semibold py-12">
              No results found
            </div>
          ) : (
            <MediaGalleryGrid items={filteredItems} />
          )}
        </div>
      </section>

      <CTASection
        heading="Partner with Us to Secure Imo Communities"
        subtext="Join our mission to strengthen community policing, empower vigilante services, and improve homeland security across all autonomous communities."
        buttonLabel="Contact Us"
        buttonHref="/contact-us"
      />

      <Footer />
    </main>
  );
}
