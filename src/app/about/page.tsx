"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="bg-[#fbfbfb] selection:bg-[#3D2B1F] selection:text-white ">
      
     {/* 1. HERO: The "Statement" (Minimal & Bold) */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-6 lg:px-20 min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-5xl">
          <span className="text-[#A32A29] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
            ESTABLISHED 2012 | SRI LANKA
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#0D1B2A] leading-[0.95] tracking-tighter mb-8 sm:mb-10">
            Precision in every <br />
            <span className="text-[#4A2B10] italic font-light">coordinate.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
            We don&apos;t just measure land. We provide the mathematical certainty required for the nation&apos;s most ambitious infrastructure.
          </p>
        </div>
        
        {/* Floating Abstract Element */}
        <div className="absolute right-3 lg:right-30 top-40 bottom-20 pointer-events-none hidden lg:block">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover rounded-xl border-2 border-gray-100 shadow-sm"
            >
              <source src="/videos/animate.mp4" type="video/mp4" />
              {/* Fallback image if the video fails to load */}
              <img 
                src="/images/hero.png" 
                alt="Surveyor at work" 
                className="w-full h-full object-cover rounded-xl"
              />
            </video>
        </div>
      </section>

      {/* 2. THE STAGGERED VISION/MISSION (Using your preferred layout) */}
      <section className="py-16 sm:py-20 md:py-24 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Vision */}
          <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-12 md:gap-16">
            <div className="relative w-full md:w-3/5 group">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#A32A29]/5 rounded-2xl -z-10 transition-transform group-hover:scale-105" />
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/p1.jpg" alt="Vision" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">Our Vision</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                To be the primary architect of geospatial data, ensuring every foundation in the region is built upon absolute mathematical truth.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 sm:gap-12 md:gap-16">
            <div className="w-full md:w-2/5 text-left md:text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                Merging drone-assisted photogrammetry with traditional field expertise to deliver high-fidelity survey plans that exceed regulatory standards.
              </p>
            </div>
            <div className="relative w-full md:w-3/5 group">
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#0D1B2A]/5 rounded-2xl -z-10 transition-transform group-hover:scale-105" />
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/p2.jpg" alt="Mission" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE EXPERTISE (Replacing "Services Overview") 
      <section className="py-32 bg-[#0D1B2A] text-white px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-white/10 pb-10">
            <h2 className="text-5xl font-bold tracking-tight">Core Expertise</h2>
            <p className="text-gray-400 mt-4 md:mt-0 italic">Mapping the complex. Simplfying the build.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
            {[
              { title: "Boundary Surveys", icon: <Drill size={32}/>, desc: "Legal determination of property lines with GPS precision." },
              { title: "Land Partitioning", icon: <Binary size={32}/>, desc: "Strategic subdivision layouts for commercial optimization." },
              { title: "Topo Mapping", icon: <Layers size={32}/>, desc: "Detailed 3D terrain data for engineering design." },
              { title: "Drone Surveying", icon: <Cpu size={32}/>, desc: "High-speed aerial data collection for large acreages." },
            ].map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="text-[#A32A29] mb-6 group-hover:translate-x-2 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

    {/* 4. TECHNOLOGY & VALUES: The "Details" Section */}
<section className="py-20 md:py-32 px-6 lg:px-20 max-w-7xl mx-auto">
  <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
    <div className="lg:col-span-5 space-y-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1B2A]">Technology & Approach</h2>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
        We utilize a proprietary blend of 20 Stations, GNSS Receivers, and DJI Enterprise Drones. Field data is processed using specialized GIS and CAD software, producing survey plans that aren&apos;t just accurate; they are digital assets for your future development.
      </p>
      <div className="pt-6 space-y-6">
          <div className="flex items-center gap-4 text-xl font-bold text-[#0D1B2A]">
              <span className="w-12 h-px bg-[#A32A29]"></span> Specializetion
          </div>
          <div className="flex items-center gap-4 text-xl font-bold text-[#0D1B2A]">
              <span className="w-12 h-px bg-[#A32A29]"></span> 99.9% Accuracy Rate
          </div>
          <div className="flex items-center gap-4 text-xl font-bold text-[#0D1B2A]">
              <span className="w-12 h-px bg-[#A32A29]"></span> ISO Compliant Standards
          </div>
      </div>
    </div>
     <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
       <div className="h-52 sm:h-64 md:h-80 relative rounded-3xl overflow-hidden mt-4 sm:mt-8 md:mt-12">
          <Image src="/images/t1.jpg" fill alt="Hardware" className="object-cover" />
       </div>
       <div className="h-52 sm:h-64 md:h-80 relative rounded-3xl overflow-hidden">
          <Image src="/images/t2.jpg" fill alt="CAD Software" className="object-cover" />
       </div>
       <div className="h-52 sm:h-64 md:h-80 relative rounded-3xl overflow-hidden mt-4 sm:mt-8 md:mt-24">
          <Image src="/images/t3.jpg" fill alt="Field Work" className="object-cover" />
       </div>
       <div className="h-52 sm:h-64 md:h-80 relative rounded-3xl overflow-hidden">
          <Image src="/images/t4.png" fill alt="Field Work" className="object-cover" />
       </div>
    </div>
  </div>
</section>

      {/* 5. CALL TO ACTION: The "Dark Card" */}
      <section>
        <div className="bg-[#3D2B1F]  p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
              Ready to verify your next big project?
            </h2>
            <Link 
              href="/rs" 
              className="inline-flex items-center gap-4 bg-white text-[#3D2B1F] px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform"
            >
              Request a Survey <MoveRight />
            </Link>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-10 grayscale"
            >
              <source src="/videos/cta2.mp4" type="video/mp4" />
              {/* Fallback pattern if video fails */}
              <div className="absolute inset-0 bg-[url('/images/topo-pattern.png')] bg-repeat" />
            </video>
            
            {/* Optional: Add a dark overlay if the video is too bright */}
            <div className="absolute inset-0 bg-[#3D2B1F]/20" />
            </div>
          </div>
      </section>

    </main>
  );
}