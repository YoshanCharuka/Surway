"use client";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "commercial-partitioning",
    title: "Commercial Land Partitioning",
    location: "Colombo 07",
    type: "LAND SURVEY",
    image: "/images/p1.jpg", 
    client: "Urban Development Authority",
    date: "2 months ago"
  },
  {
    id: "high-rise-layout2",
    title: "High-Rise Construction Layout",
    location: "Kotte",
    type: "CONSTRUCTION",
    image: "/images/p2.jpg",
    client: "Prime Group",
    date: "27 days ago"
  },
  {
    id: "topographic-mapping",
    title: "Topographic Mapping Project",
    location: "Nuwara Eliya",
    type: "TOPOGRAPHIC",
    image: "/images/p3.jpg",
    client: "National Water Board",
    date: "20 days ago"
  },
  {
    id: "high-rise-layout",
    title: "High-Rise Construction Layout",
    location: "Kotte",
    type: "CONSTRUCTION",
    image: "/images/p4.jpg",
    client: "Prime Group",
    date: "27 days ago"
  },
];

export default function Projects() {
  return (
    <div className="bg-[#FEFEFA] min-h-screen">
      {/* Header Section - Matched to your RS Form style */}
      <section className="bg-[#FEFEFA] pt-8 pb-8 px-3">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 mt-6 text-center">
          <h2 className="text-4xl font-bold text-[#0D1B2A] md:text-5xl">Our Projects</h2>
          <p className="mt-4 text-xl font-medium text-gray-500">A showcase of our recent survey excellence and precision engineering across the island.</p>
        </div>
      </div>
      </section>

      

      {/* Grid Section - Keeping your original style */}
      <section className="pb-20 px-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <Link 
              href={`/projects/${project.id}`} 
              key={project.id} 
              className="group cursor-pointer block"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden mb-4 rounded-xl border border-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Info Section */}
              <div className="space-y-1">
                <p className="text-[#A32A29] text-[11px] font-bold uppercase tracking-wider">
                  {project.type}
                </p>
                
                <h3 className="text-[17px] font-bold text-[#1a1a1a] leading-[1.3] group-hover:underline decoration-1 underline-offset-2">
                  {project.title}
                </h3>
                
                <div className="pt-1 flex flex-wrap gap-1 text-[13px] text-gray-500">
                  <span>{project.client}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}