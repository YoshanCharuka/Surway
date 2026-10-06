"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    location: "USA, California",
    image: "/images/team.jpg",
    text: "Our experience with WeGrow was outstanding. Friendly team and very professional. Super easy to work with. Highly recommended!",
  },
  {
    name: "Jane Smith",
    location: "London, UK",
    image: "/images/team.jpg",
    text: "The survey execution was flawless. They used modern equipment and provided the data exactly when promised. Great job!",
  },
  {
    name: "Robert Fox",
    location: "Sydney, Australia",
    image: "/images/team.jpg",
    text: "Professionalism at its finest. From the initial request to the final plans, the communication was clear and the results precise.",
  },
  {
    name: "Sarah Miller",
    location: "Toronto, Canada",
    image: "/images/team.jpg",
    text: "Exceptional attention to detail. They handled our land survey with extreme care and legal precision. Highly recommend!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-[#FBFBFB] py-16 md:py-24 overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* HEADER SECTION */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">What Our Clients Say</h2>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-500">
          Comprehensive Real State Solutions for All Your Needs
        </p>

        {/* VIEWPORT CONTAINER */}
        <div className="relative mt-16 overflow-hidden">
          {/* SLIDER TRACK */}
          <div 
            className="flex transition-transform duration-500 ease-out gap-8"
            style={{ transform: `translateX(-${currentIndex * (100 / 1)}%)` }} // Adjust math if showing multiple
          >
            {testimonials.map((item) => (
              <div
                key={`${item.name}-${item.location}`}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-22px)] flex flex-col rounded-2xl bg-white p-6 sm:p-8 text-left shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <h3 className="mb-6 text-xl sm:text-2xl font-bold text-[#0D1B2A]">Exceptional Service!</h3>
                <p className="mb-8 text-sm sm:text-base leading-relaxed text-gray-600 italic">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* CLIENT INFO FOOTER */}
                <div className="mt-auto flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D1B2A]">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="mt-12 flex justify-center gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#4A2B10] transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#4A2B10] hover:text-white'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - 1}
            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#4A2B10] transition-all ${currentIndex >= testimonials.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#4A2B10] hover:text-white'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}