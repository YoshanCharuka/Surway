"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, MapPin } from "lucide-react";

// In a real app, this would come from a database or API
const projectDetails = {
  "commercial-partitioning": {
    title: "Commercial Land Partitioning",
    location: "Colombo 07",
    client: "Urban Development Authority",
    date: "2 months ago",
    description1: "A 5-acre commercial property located in Colombo recently underwent a detailed boundary survey and land partitioning process. The project was carried out for the Urban Development Authority with the goal of preparing the land for future commercial development.",
    description2: "The survey involved re-establishing the existing property boundaries and collecting accurate topographical data across the entire site. Using GPS surveying equipment and total stations, our team ensured precise measurements and reliable mapping for the partition plan.",
    description3: "The collected data was processed using GIS and CAD software to design a practical subdivision layout. Road access, plot usability, and regulatory requirements were carefully considered to create a plan suitable for commercial use.",
    description4: "The final outcome was a well-structured partition plan that divided the land into several commercial lots while maintaining proper access and compliance with planning regulations.",
    description5: "All documentation, including the certified survey plan and digital mapping files, was prepared for submission and future development reference. The project demonstrates the importance of accurate surveying and thoughtful planning when preparing land for commercial use.",
    mainImage: "/images/p1.jpg",
    sideImage: "/images/p2.jpg",
    gallery: ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg"]
  }
};

export default function ProjectView() {
  const params = useParams();
  const id = params.id as string;
  const data = projectDetails[id as keyof typeof projectDetails];

  if (!data) return <div className="pt-32 text-center">Project not found</div>;

  return (
    <main className=" min-h-screen pb-20">
      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/projects" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">{data.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2"><MapPin size={18}/> {data.location}</div>
            <div className="flex items-center gap-2"><User size={18}/> {data.client}</div>
            <div className="flex items-center gap-2"><Calendar size={18}/> {data.date}</div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pt-0 space-y-6">
        {/* Intro */}
        <p className="text-xl leading-relaxed text-gray-700">{data.description1}</p>

        {/* Full Width Image with Play Button */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <Image 
            src={data.mainImage} 
            alt="Main view - Click to play video" 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 p-6 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              {/* Play Icon (Simple Triangle) */}
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#3D2B1F] translate-x-1" /* offset triangle slightly to center visually */
              >
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Second Paragraph + Side Image */}
        <div className=" space-y-6">
          <p className="text-lg leading-relaxed text-gray-600">{data.description2}</p>
          
        </div>

        {/* Third & Fourth Paragraphs */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-600">{data.description3}</p>
          <p className="text-lg leading-relaxed text-gray-600">{data.description4}</p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.gallery.map((img, idx) => (
            <div key={idx} className="relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className=" p-8 rounded-2xl border-l-4 border-[#3D2B1F]">
          <p className="text-lg leading-relaxed text-gray-700 italic">{data.description5}</p>
        </div>
      </section>
    </main>
  );
}