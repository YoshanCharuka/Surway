"use client"; // Required for animations and hooks
import Link from "next/link";

import Navbar from "./navbar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 1. Background Image - The Base Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Surveyor at work" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Content Layer (Navbar + Text) */}
      <div className="relative z-10 flex flex-col min-h-screen">
       
        
        <main className="grow flex items-center px-10 md:px-25">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-5">
              <h1 className="text-6xl font-bold text-[#0D1B2A] leading-tight">
                Where Accuracy Meets <br /> Expertise 
              </h1>
              <p className="text-lg text-gray-1000 font-semibold max-w-lg">
                Expert land and property survey services ensuring clarity, compliance, and peace of mind.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 border-2 border-[#4A2B10] text-[#4A2B10] font-bold rounded-xl hover:bg-white/10 transition"
                >
                Browse Services 
              </button>
              <Link href="/rs">
  <button className="px-8 py-3 bg-[#4A2B10] text-white font-bold rounded-xl hover:bg-[#5f340f] transition shadow-lg">
    Request Survey
  </button>
</Link>
            </div>

            {/* Stats Cards Section */}
            <div className="flex gap-4 pt-2">
              <StatCard number={200} suffix=" +" label="Projects Completed" /> 
              <StatCard number={10} suffix=" +" label="Years Experience" /> 
              <StatCard number={98} suffix="%" label="Client Satisfaction" /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Updated Reusable StatCard Component with Rolling Numbers and Hover Effects
function StatCard({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, number, { duration: 2 });
    return controls.stop;
  }, [number]);

  return (
    <motion.div 
      // HOVER TRANSITION: Scales up slightly and increases shadow
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      // SIZE ADJUSTMENT: Change w-[200px] and h-[120px] to your preferred dimensions
      className="bg-[#4A2B10] text-white p-6 rounded-2xl w-45 h-25 flex flex-col justify-center shadow-xl cursor-default"
    >
      <div className="text-3xl font-bold flex">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm opacity-90 leading-tight mt-1">{label}</p>
    </motion.div>
  );
}