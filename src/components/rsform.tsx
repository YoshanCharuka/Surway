"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

const PRICE_PER_PERCH = 25000;
const DISTANCE_MAP: Record<string, string> = {
  "nugegoda": "5 km",
  "kotte": "8 km",
  "pannipitiya": "3 km",
  "homagama": "10 km",
  "colombo": "15 km",
  "maharagama": "0 km"
};

export default function RSForm() {
  const [formData, setFormData] = useState({
    location: "",
    perches: "",
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const derivedFields = useMemo(() => {
    const loc = formData.location.toLowerCase().trim();
    const perchCount = Number.parseFloat(formData.perches);

    const distance = DISTANCE_MAP[loc] || "";
    let estimatedValue = "";
    if (!Number.isNaN(perchCount)) {
      const total = perchCount * PRICE_PER_PERCH;
      estimatedValue = `Rs. ${total.toLocaleString()}`;
    }

    return { distance, estimatedValue };
  }, [formData.location, formData.perches]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...derivedFields }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ location: "", perches: "", name: "", email: "", phone: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  let submitLabel = "Request Survey";
  if (status === "loading") {
    submitLabel = "Sending...";
  } else if (status === "success") {
    submitLabel = "Sent Successfully!";
  }

  return (
    <section className="bg-[#FBFBFB] pt-8 pb-16 md:pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 mt-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">Get Quick Estimate</h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-700">Distance and Price are calculated automatically based on input.</p>
        </div>

        <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-sm md:p-14 border border-gray-100">
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
              value={derivedFields.distance}
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
              value={derivedFields.estimatedValue}
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
              className={`w-full rounded-xl py-4 text-base sm:text-lg font-bold text-white transition-all md:col-span-2 ${
                status === "success" ? "bg-green-600" : "bg-[#3D2B1F] hover:bg-[#2A1D15]"
              }`}
            >
              {submitLabel}
            </button>
            
            {status === "error" && <p className="text-red-500 text-sm text-center col-span-full">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}