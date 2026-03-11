"use client";

import Image from "next/image";

const benefits = [
  {
    title: "CERTIFIED SURVEYORS",
    desc: "Our support team will get assistance from AI-powered.",
    icon: "/images/badge.png", // Replace with your actual icon path
  },
  {
    title: "TIMELY DELIVERY",
    desc: "Our support team will get assistance from AI-powered.",
    icon: "/images/clock.png",
  },
  {
    title: "PROFESSIONAL TEAM",
    desc: "Our support team will get assistance from AI-powered.",
    icon: "/images/team.png",
  },
  {
    title: "RELIABILITY",
    desc: "Our support team will get assistance from AI-powered.",
    icon: "/images/shield.png",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FBFBFB] py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* SECTION HEADER */}
        <h2 className="text-4xl font-bold text-[#0D1B2A] md:text-5xl">Why Choose Us</h2>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Your Trusted Partner for Professional Surveying Services
        </p>

        {/* BENEFITS GRID */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group flex flex-col items-center rounded-xl bg-white p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* ICON CONTAINER */}
              <div className="relative mb-6 h-20 w-20">
                <Image
                  src={benefit.icon}
                  alt={benefit.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* TEXT CONTENT */}
              <h3 className="mb-3  font-bold tracking-tight text-[#0D1B2A]">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}