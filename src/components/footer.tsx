"use client";

import Link from "next/link";
import { FacebookIcon, LinkedinIcon, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white py-14 md:py-16 px-6 sm:px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Logo and About Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
   <img 
      src="/images/wlogo.png" 
      alt="logo" 
      className="w-25 h-12 object-cover"
    />
  </div>
          <p className="text-gray-400 leading-relaxed mb-8">
            Expert land and property survey services ensuring clarity, compliance, and peace of mind.
          </p>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/share/1DmH7FjK6Y/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
            >
              <FacebookIcon size={24} />
            </Link>
            <Link href="https://wa.me/94773742486" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-400 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 relative">
                <MessageCircle size={24} className="hover:text-gray-400 transition-colors absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={2} />
                <Phone size={12} className="hover:text-gray-400 transition-colors absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} fill="none" />
              </span>
            </Link>
            <Link href="https://www.linkedin.com/company/wegro-ceylon/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-400 transition-colors">
              <LinkedinIcon size={24} />
            </Link>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Navigation</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Request Survey</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link href="/projects" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Our Services Column */}
        <div>
          <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Our Services</h3>
          <ul className="space-y-4 text-gray-400">
            <li>Land Survey</li>
            <li>Construction Survey</li>
            <li>Surveying Consultancy</li>
            <li>Setting Out Survey</li>
            <li>Topographic Survey</li>
            <li>Condnomium Survey</li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Contact Info</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <Link href="tel:+94773742486" className="flex items-center gap-3">
                <Phone size={18} /> (+94) 77 374 2486
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Link href="mailto:office.wegro@gmail.com" className="flex items-center gap-3">
                <Mail size={18} /> info@survey.com
              </Link>
            </li>
            <li className="flex items-start gap-3">
              <Link href="https://www.google.com/maps/search/?api=1&query=Wegro+Ceylon+Maharagama" target="_blank"
               className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-0.5" /> No 47, Welyaya Rd, Nawinna, Maharagama, Sri Lanka
              </Link>
            </li>
          </ul>
        </div>

        {/* Map Preview Column */}
<div className="lg:col-span-1">
  <Link href="https://www.google.com/maps/search/?api=1&query=Wegro+Ceylon+Maharagama" target="_blank">
    <div className="rounded-2xl overflow-hidden h-48 w-full shadow-lg border border-gray-800 transition-all duration-300 hover:scale-[1.02] md:hover:scale-110">
      <img 
        src="/images/map-placeholder.png" 
        alt="Office Location Map" 
        className="w-full h-full object-cover"
      />
    </div>
  </Link>
</div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
        © {currentYear} All Rights Reserved
      </div>
    </footer>
  );
}