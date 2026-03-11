"use client";

import Image from "next/image";

const steps = [
  {
    title: "Submit Survey Request",
    desc: "Fill out our simple online form with your project details, location, and requirements.",
    image: "/images/step1.png",
  },
  {
    title: "Team Reviews & Confirms",
    desc: "Our team reviews your request, provides accurate pricing, and confirms the schedule.",
    image: "/images/step2.png",
  },
  {
    title: "Survey Execution",
    desc: "Professional surveyors visit your site with modern instruments to collect precise data.",
    image: "/images/step3.png",
  },
  {
    title: "Final Plans & Handover",
    desc: "Receive accurate survey plans, legal documents, and all necessary certifications.",
    image: "/images/step4.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-0 overflow-hidden py-24 ">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">How it Works</h2>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-500">
          Comprehensive Surveying Solutions for your Land & Constructions Needs
        </p>

        <div className="relative mt-20">
          {/* THE DOTTED WAVE BEHIND THE IMAGES */}
          <svg
            className="absolute top-1/4 left-0 w-full hidden md:block"
            viewBox="0 0 1200 150"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C150,20 350,140 500,80 C650,20 850,140 1000,80 C1100,40 1200,80 1200,80"
              stroke="#CBD5E1"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
          </svg>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((step) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center">
                {/* IMAGE CONTAINER */}
                <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* TEXT CONTENT */}
                <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-3 leading-tight px-4">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}