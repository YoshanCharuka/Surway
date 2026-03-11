"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export default function RSForm() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    distance: "",
    perches: "",
    estimatedValue: "",
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // --- CONFIGURATION ---
  const PRICE_PER_PERCH = 25000;
  const distanceMap: Record<string, string> = {
    "nugegoda": "5 km",
    "kotte": "8 km",
    "pannipitiya": "3 km",
    "homagama": "10 km",
    "colombo": "15 km",
    "maharagama": "0 km"
  };

  // 1. Handle Hydration: Only render after mounting on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Logic: Automatic Calculations
  useEffect(() => {
    if (!isClient) return;

    const loc = formData.location.toLowerCase().trim();
    const perchCount = parseFloat(formData.perches);
    const updates: Partial<typeof formData> = {};

    // Calculate Distance
    const newDistance = distanceMap[loc] || "";
    if (newDistance !== formData.distance) {
      updates.distance = newDistance;
    }

    // Calculate Estimated Value
    let newValue = "";
    if (!isNaN(perchCount)) {
      const total = perchCount * PRICE_PER_PERCH;
      newValue = `Rs. ${total.toLocaleString()}`;
    }
    if (newValue !== formData.estimatedValue) {
      updates.estimatedValue = newValue;
    }

    // Only update state if there is an actual change to prevent loops
    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
    }
  }, [formData.location, formData.perches, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ location: "", distance: "", perches: "", estimatedValue: "", name: "", email: "", phone: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  // Prevent Hydration Mismatch by returning null or a skeleton until mounted
  if (!isClient) {
    return <div className="max-w-5xl mx-auto h-[600px] bg-gray-50 animate-pulse rounded-3xl" />;
  }

  return (
    <section className="bg-[#FBFBFB] pt-8 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 mt-6 text-center">
          <h2 className="text-4xl font-bold text-[#0D1B2A] md:text-5xl">Get Quick Estimate</h2>
          <p className="mt-4 text-xl font-medium text-gray-700">Distance and Price are calculated automatically based on input.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-14 border border-gray-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            <div className="relative">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location (e.g. Nugegoda)"
                required
                className="w-full rounded-xl bg-[#F3F4F6] p-4 pr-12 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <input
              name="distance"
              value={formData.distance}
              readOnly
              placeholder="Distance (Auto-calculated)"
              className="w-full rounded-xl bg-[#E5E7EB] p-4 outline-none cursor-not-allowed text-gray-600"
            />

            <input
              name="perches"
              value={formData.perches}
              onChange={handleChange}
              type="number"
              placeholder="Number of Perches"
              required
              className="w-full rounded-xl bg-[#F3F4F6] p-4 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20"
            />
            
            <input
              name="estimatedValue"
              value={formData.estimatedValue}
              readOnly
              placeholder="Estimated Value (Auto-calculated)"
              className="w-full rounded-xl bg-[#E5E7EB] p-4 outline-none cursor-not-allowed text-gray-600 "
            />

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full rounded-xl bg-[#F3F4F6] p-4 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" required className="w-full rounded-xl bg-[#F3F4F6] p-4 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20" />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Your Phone Number" required className="w-full rounded-xl bg-[#F3F4F6] p-4 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20" />

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full rounded-xl py-4 text-lg font-bold text-white transition-all ${
                status === "success" ? "bg-green-600" : "bg-[#3D2B1F] hover:bg-[#2A1D15]"
              }`}
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Sent Successfully!" : "Request Survey"}
            </button>
            
            {status === "error" && <p className="text-red-500 text-sm text-center col-span-full">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}