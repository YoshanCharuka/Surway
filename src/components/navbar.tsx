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
  const [menuOpen, setMenuOpen] = useState(false);

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
      fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 z-50 transition-all duration-300
      ${!isHomePage || scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
        : "bg-white/95 md:bg-transparent shadow-sm md:shadow-none py-2 md:py-4"}
    `}>
      
      {/* Logo */}
      <div className="w-28 sm:w-32">
        <img 
          src="/images/logo.png" 
          alt="logo" 
          className={`w-full p-1 h-auto transition-all duration-300 `}
          // If the logo is black, we invert it to white when the background is transparent (on the home hero)
        />
      </div>

      {/* Glassmorphism Sliding Tabs */}
      <div className="hidden md:flex items-center px-2 py-2.5 rounded-full transition-all duration-300">
        <ul className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            let linkColorClass = "text-white hover:text-gray-300";
            if (!isHomePage || scrolled) {
              linkColorClass = "text-gray-900 hover:text-[#4A2B10]";
            }
            if (isActive) {
              linkColorClass = "text-white";
            }
            return (
              <li key={link.path} className="relative px-2">
                <Link
                  href={link.path}
                  className={`relative z-10 px-6 py-3 text-lg font-bold transition-colors duration-300 ${linkColorClass}`}
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

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        className={`md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border transition-colors ${
          !isHomePage || scrolled
            ? "border-gray-300 text-gray-800"
            : "border-gray-300 text-gray-800 md:border-white/80 md:text-white"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-t border-gray-200 bg-white shadow-lg">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                      isActive ? "bg-[#4A2B10] text-white" : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}