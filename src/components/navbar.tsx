"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Request Survey', path: '/rs' },
  { name: 'Projects', path: '/projects' },
  { name: 'About Us', path: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Logic: Is it the home page?
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 left-0 w-full flex items-center justify-between px-10 md:px-25 z-50 transition-all duration-300
      ${!isHomePage || scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm py-2" 
        : "bg-transparent py-4"}
    `}>
      
      {/* Logo */}
      <div className="w-32">
        <img 
          src="/images/logo.png" 
          alt="logo" 
          className={`w-full p-1 h-auto transition-all duration-300 `}
          // If the logo is black, we invert it to white when the background is transparent (on the home hero)
        />
      </div>

      {/* Glassmorphism Sliding Tabs */}
      <div className="flex items-center px-2 py-2.5 rounded-full transition-all duration-300">
        <ul className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path} className="relative px-2">
                <Link
                  href={link.path}
                  className={`relative z-10 px-6 py-3 text-lg font-bold transition-colors duration-300 ${
                    isActive 
                      ? "text-white" 
                      : (!isHomePage || scrolled ? "text-gray-900 hover:text-[#4A2B10]" : "text-white hover:text-gray-300")
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#4A2B10] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}