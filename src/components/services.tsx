"use client";

import Image from "next/image";
import type { ReactNode } from "react";

type ServiceItem = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const iconClassName = "h-10 w-10 text-[#4A2B10]"; 

const services: ServiceItem[] = [
  { title: "Land Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><path d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z" /><circle cx="12" cy="11" r="2.5" /></svg>) },
  { title: "Construction Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></svg>) },
  { title: "Setting Out Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>) },
  { title: "Topographic Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><path d="M4 16c1.8-4 3.8-6 6-6 2.8 0 3.2 4 5.6 4 1.2 0 2.4-.8 4.4-2.8" /><path d="M3 19h18" /></svg>) },
  { title: "Condominium Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><path d="M8 4h8" /><path d="M6 7h10" /><path d="M6 11h8" /><path d="M6 15h6" /><path d="M6 19h4" /></svg>) },
  { title: "Static Survey", desc: "Precise land boundary surveys with legal documentation support.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName}><circle cx="12" cy="12" r="8" /><path d="M9.5 14.5 14.5 9.5" /><path d="M9 9h6v6" /></svg>) },
];

export default function Services() {
  return (
    <section id="services-section" className=" snap-start h-screen relative z-0 overflow-hidden bg-[#FBFBFB] pt-12 pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <Image src="/images/topo-pattern.png" alt="Topographic pattern" fill className="object-cover" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#0D1B2A] md:text-5xl">Our Services</h2>
          <p className="mt-4 text-xl font-medium text-gray-500">
            Comprehensive Surveying Solutions for Your Land & Constructions Needs
          </p>
        </div>

        <div className="flex flex-wrap justify-center max-w-6xl mx-auto md:space-y-0 space-y-8">
          {services.map((service, index) => {
            let staggerClass = "";

            if (index === 5) {
              // Specifically TARGETING Static Survey to go UP
              // Adjust 10 to 0 if you want it perfectly level with the top row
              staggerClass = "md:translate-y-1"; 
            } else if (index % 2 !== 0) {
              // Others remain in the "Down" position
              staggerClass = "md:translate-y-24";
            } else {
              // Top row cards
              staggerClass = "md:-translate-y-4";
            }

            return (
            <div
              key={service.title}
              className={`relative transition-all duration-300 hover:z-50 hover:scale-110 md:-mx-5 ${staggerClass}`}
              style={{
                filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.05))"
              }}
            >
              <article
                className="relative flex h-[240px] w-[270px] shrink-0 items-center justify-center bg-white text-center"
                style={{
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
              >
                <div className="flex flex-col items-center px-6">
                  <div className="mb-3 rounded-full border-2 border-[#4A2B10] p-2">
                    {service.icon}
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-[#0D1B2A] leading-tight">{service.title}</h3>
                  <p className="text-[15px] leading-tight text-gray-500 max-w-[150px]">{service.desc}</p>
                </div>
              </article>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}