"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, XCircle, Loader2, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function BookingItem({ booking }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      if (res.ok) router.refresh();
    } catch (error) {
      alert("Action failed.");
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    Pending: {
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    Confirmed: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    Cancelled: {
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    Completed: {
      color: "text-stone-600",
      bg: "bg-stone-50",
      border: "border-stone-200",
    },
  };

  const currentStatus = statusConfig[booking.status] || statusConfig.Pending;

  return (
    <div className="group bg-white rounded-3xl border border-stone-100 p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Info Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              {booking.serviceTitle}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-300" />
              <span>
                {new Date(booking.startDate || booking.date).toLocaleDateString(
                  undefined,
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-stone-300" />
              <span>{booking.location?.district || "Dhaka"}</span>
            </div>
          </div>
        </div>

        {/* Actions & Pricing */}
        <div className="flex flex-row items-center justify-between lg:justify-end gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-stone-50">
          <div className="text-left lg:text-right">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">
              Investment
            </p>
            <p className="text-3xl font-black text-stone-900 italic tracking-tighter">
              <span className="text-lg mr-1 font-normal not-italic text-stone-400 font-sans">
                ৳
              </span>
              {booking.totalCost}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/services/${booking.serviceId}`}
              className="p-3 bg-stone-50 text-stone-600 hover:bg-stone-900 hover:text-white rounded-2xl transition-all border border-stone-100"
            >
              <Eye className="w-5 h-5" />
            </Link>

            {booking.status === "Pending" && (
              <button
                onClick={handleCancel}
                disabled={loading}
                className="p-3 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-stone-100 hover:border-rose-100"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
