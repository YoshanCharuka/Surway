"use client"; // Required for animations and hooks
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

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
       
        
        <div className="grow flex items-start md:items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-24 md:pt-16 pb-10">
          <div className="max-w-3xl w-full space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] leading-tight">
                Where Accuracy Meets <br className="hidden sm:block" /> Expertise 
              </h1>
              <p className="text-sm sm:text-lg text-[#1E1E1E] font-semibold max-w-lg">
                Expert land and property survey services ensuring clarity, compliance, and peace of mind.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 border-2 border-[#4A2B10] text-[#4A2B10] font-bold rounded-xl hover:bg-white/10 transition w-full sm:w-auto"
                >
                Browse Services 
              </button>
              <Link
                href="/rs"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-[#4A2B10] text-white font-bold rounded-xl hover:bg-[#5f340f] transition shadow-lg w-full sm:w-auto"
              >
                Request Survey
              </Link>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <StatCard number={200} suffix=" +" label="Projects Completed" /> 
              <StatCard number={10} suffix=" +" label="Years Experience" /> 
              <StatCard number={98} suffix="%" label="Client Satisfaction" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  readonly number: number;
  readonly suffix: string;
  readonly label: string;
};

// Updated Reusable StatCard Component with Rolling Numbers and Hover Effects
function StatCard({ number, suffix, label }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, number, { duration: 2 });
    return controls.stop;
  }, [count, number]);

  return (
    <motion.div 
      // HOVER TRANSITION: Scales up slightly and increases shadow
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      // SIZE ADJUSTMENT: Change w-[200px] and h-[120px] to your preferred dimensions
      className="bg-[#4A2B10] text-white p-5 sm:p-6 rounded-2xl w-full min-h-24 sm:min-h-25 flex flex-col justify-center shadow-xl cursor-default"
    >
      <div className="text-3xl font-bold flex">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm opacity-90 leading-tight mt-1">{label}</p>
    </motion.div>
  );
}