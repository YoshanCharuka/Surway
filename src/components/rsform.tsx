"use client";

import { useMemo, useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { estimateSurveyCost, resolvePricePerKm, resolvePricePerPerch } from "@/lib/quotation";

export default function RSForm() {
  const [formData, setFormData] = useState({
    location: "",
    perches: "",
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pricePerPerch, setPricePerPerch] = useState<number | null>(null);
  const [pricePerKm, setPricePerKm] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [ratesError, setRatesError] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceStatus, setDistanceStatus] = useState<"idle" | "loading" | "error">("idle");
  const [distanceError, setDistanceError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/locations");
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          const nextItems = Array.isArray(data.items) ? data.items : [];
          setPricePerPerch(resolvePricePerPerch(nextItems));
          setPricePerKm(resolvePricePerKm(nextItems));
          setRatesError("");
          return;
        }
        throw new Error(data?.error || data?.message || "Cannot connect to the WordPress database.");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Cannot connect to the WordPress database.";
        setRatesError(message);
        throw error;
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const query = formData.location.trim();
    if (query.length < 2) {
      setDistance("");
      setDistanceKm(null);
      setDistanceStatus("idle");
      setDistanceError("");
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setDistance("");
      setDistanceKm(null);
      setDistanceStatus("loading");
      setDistanceError("");
      try {
        const res = await fetch(`/api/distance?location=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success && typeof data.distance === "string") {
          setDistance(data.distance);
          setDistanceKm(typeof data.kilometers === "number" ? data.kilometers : null);
          setDistanceStatus("idle");
          return;
        }
        setDistance("");
        setDistanceKm(null);
        setDistanceStatus("error");
        setDistanceError(data?.error || "Could not calculate distance.");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setDistance("");
        setDistanceKm(null);
        setDistanceStatus("error");
        setDistanceError("Could not calculate distance.");
      }
    }, 700);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [formData.location]);

  const derivedFields = useMemo(() => {
    const perchCount = Number.parseFloat(formData.perches);
    const total = estimateSurveyCost(
      Number.isNaN(perchCount) ? null : perchCount,
      distanceKm,
      pricePerPerch,
      pricePerKm,
    );

    const estimatedValue = total === null
      ? ""
      : `Rs. ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

    return { estimatedValue };
  }, [formData.perches, distanceKm, pricePerPerch, pricePerKm]);

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
        body: JSON.stringify({ ...formData, distance, ...derivedFields }),
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
                placeholder="Location (e.g. Nugegoda)"
                required
                className="w-full rounded-xl bg-[#F3F4F6] p-4 pr-14 outline-none focus:ring-2 focus:ring-[#3D2B1F]/20"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <input
              name="distance"
              value={distance}
              readOnly
              placeholder={distanceStatus === "loading" ? "Calculating distance..." : "Distance (Auto-calculated)"}
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
            
            {distanceError && (
              <p className="text-red-500 text-sm text-center col-span-full">
                {distanceError}
              </p>
            )}
            {ratesError && (
              <p className="text-red-500 text-sm text-center col-span-full">
                {ratesError}
              </p>
            )}
            {status === "error" && <p className="text-red-500 text-sm text-center col-span-full">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}