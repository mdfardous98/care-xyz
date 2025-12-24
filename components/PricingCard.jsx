"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Clock,
  ShieldCheck,
  UserCheck,
  Phone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function PricingCard({ service, session }) {
  const [rateType, setRateType] = useState("daily");

  const hourlyRate = service.price;
  const dailyRate = service.dailyRate || service.price * 8;
  const savings = Math.round(
    ((hourlyRate * 8 - dailyRate) / (hourlyRate * 8)) * 100
  );

  const bookingUrl = session
    ? `/booking/${service._id}?type=${rateType}`
    : `/login?callbackUrl=/booking/${service._id}?type=${rateType}`;

  const activeStyles =
    "bg-stone-50 border-stone-900 text-stone-900 ring-1 ring-stone-900";
  const inactiveStyles =
    "bg-white border-stone-100 text-stone-500 hover:border-stone-200";

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sticky top-28 border border-stone-100">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 mb-8">
        Selection & Value
      </h3>

      <div className="space-y-4 mb-10">
        {/* Daily Rate */}
        <button
          onClick={() => setRateType("daily")}
          className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-2 text-left relative ${
            rateType === "daily" ? activeStyles : inactiveStyles
          }`}
        >
          <div className="flex items-center">
            <DollarSign
              className={`w-5 h-5 mr-4 ${
                rateType === "daily" ? "text-rose-500" : "text-stone-300"
              }`}
            />
            <div>
              <span className="font-bold block text-sm uppercase tracking-wider">
                Full Day
              </span>
              <span className="text-[11px] font-medium opacity-60 italic">
                Best for intensive care
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-black text-xl block">৳{dailyRate}</span>
            {savings > 0 && (
              <span className="text-[10px] font-black text-rose-500 uppercase italic">
                Save {savings}%
              </span>
            )}
          </div>
        </button>

        {/* Hourly Rate */}
        <button
          onClick={() => setRateType("hourly")}
          className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-2 text-left ${
            rateType === "hourly" ? activeStyles : inactiveStyles
          }`}
        >
          <div className="flex items-center">
            <Clock
              className={`w-5 h-5 mr-4 ${
                rateType === "hourly" ? "text-rose-500" : "text-stone-300"
              }`}
            />
            <div>
              <span className="font-bold block text-sm uppercase tracking-wider">
                Hourly
              </span>
              <span className="text-[11px] font-medium opacity-60 italic">
                Minimum 2 hours
              </span>
            </div>
          </div>
          <span className="font-black text-xl text-stone-900">
            ৳{hourlyRate}
          </span>
        </button>
      </div>

      <Link
        href={bookingUrl}
        className="group flex items-center justify-center w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl shadow-stone-100"
      >
        {session ? "Initialize Booking" : "Login to Reserve"}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      {!session && (
        <p className="text-[10px] text-center text-blue-500 mt-4 font-bold uppercase tracking-widest">
          Authentication Required
        </p>
      )}

      {/* Premium Trust Signals */}
      <div className="mt-10 pt-8 border-t border-stone-50 grid grid-cols-2 gap-y-4 gap-x-2">
        {[
          { Icon: ShieldCheck, label: "Elite Vetting" },
          { Icon: UserCheck, label: "Govt ID Verified" },
          { Icon: Phone, label: "24/7 Concierge" },
          { Icon: CheckCircle, label: "Instant Swap" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center text-[11px] font-bold text-stone-500 uppercase tracking-tighter"
          >
            <item.Icon className="w-3.5 h-3.5 text-rose-500 mr-2" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
