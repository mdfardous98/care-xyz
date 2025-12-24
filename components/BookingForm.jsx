"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, Calendar, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

const bdLocations = {
  Dhaka: ["Dhaka City", "Gazipur", "Narayanganj", "Savar", "Tangail"],
  Chittagong: ["Chittagong City", "Cox's Bazar", "Cumilla", "Feni", "Noakhali"],
  Rajshahi: ["Rajshahi City", "Bogura", "Pabna", "Naogaon"],
  Khulna: ["Khulna City", "Jashore", "Kushtia", "Satkhira"],
  Sylhet: ["Sylhet City", "Moulvibazar", "Habiganj", "Sunamganj"],
  Barishal: ["Barishal City", "Bhola", "Patuakhali"],
  Rangpur: ["Rangpur City", "Dinajpur", "Saidpur"],
  Mymensingh: ["Mymensingh City", "Netrokona", "Sherpur"],
};

export default function BookingForm({ service }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rateType = searchParams.get("type") || "hourly";

  const [formData, setFormData] = useState({
    division: "",
    district: "",
    area: "",
    address: "",
    duration: 1,
    startDate: "",
  });
  const [loading, setLoading] = useState(false);

  const currentRate =
    rateType === "daily"
      ? service.dailyRate || service.price * 8
      : service.price;
  const totalCost = formData.duration * currentRate;

  useEffect(() => {
    if (status === "unauthenticated")
      router.push(`/login?callbackUrl=/booking/${service._id}`);
  }, [status, router, service._id]);

  if (status === "loading")
    return (
      <div className="h-96 flex items-center justify-center text-stone-400">
        Loading Secure Checkout...
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      serviceId: service._id,
      serviceTitle: service.title,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
      startDate: formData.startDate,
      location: {
        division: formData.division,
        district: formData.district,
        area: formData.area,
        address: formData.address,
      },
      duration: formData.duration,
      rateType,
      totalCost,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/my-bookings?status=success");
      } else {
        alert("Booking failed. Please check your details.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/40 overflow-hidden flex flex-col lg:flex-row border border-stone-100">
        {/* Left: Summary Panel */}
        <div className="bg-stone-900 text-white p-10 lg:w-80 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck className="text-rose-400 w-6 h-6" />
            </div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-6">
              Booking Details
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                  Service Type
                </p>
                <p className="text-lg font-medium">{service.title}</p>
              </div>
              <div>
                <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                  Base Rate
                </p>
                <p className="text-lg font-medium">
                  ৳{currentRate}{" "}
                  <span className="text-sm text-stone-500">
                    /{rateType === "daily" ? "day" : "hr"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-800">
            <p className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">
              Total Amount
            </p>
            <p className="text-4xl font-bold tracking-tighter italic text-white">
              ৳{totalCost}
            </p>
            <p className="text-stone-500 text-[10px] mt-2 italic">
              Securely processed by Care.xyz
            </p>
          </div>
        </div>

        {/* Right: Detailed Form */}
        <div className="p-10 flex-grow bg-[#fdfcfb]">
          <h1 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">
            Scheduling & Location
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timing Section */}
              <div className="space-y-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-rose-500" /> Timing
                </h3>
                <div>
                  <label className="text-xs font-bold text-stone-400 mb-2 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-stone-50 border-none rounded-xl p-3 text-stone-900 focus:ring-2 focus:ring-rose-500/20"
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-400 mb-2 block">
                    Duration ({rateType})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    className="w-full bg-stone-50 border-none rounded-xl p-3 text-stone-900"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-rose-500" /> Location
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-400 mb-2 block">
                      Division
                    </label>
                    <select
                      required
                      className="w-full bg-stone-50 border-none rounded-xl p-3 text-sm font-semibold"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          division: e.target.value,
                          district: "",
                        })
                      }
                    >
                      <option value="">Select</option>
                      {Object.keys(bdLocations).map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-400 mb-2 block">
                      District
                    </label>
                    <select
                      required
                      disabled={!formData.division}
                      className="w-full bg-stone-50 border-none rounded-xl p-3 text-sm font-semibold disabled:opacity-30"
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      {formData.division &&
                        bdLocations[formData.division].map((dis) => (
                          <option key={dis} value={dis}>
                            {dis}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-400 mb-2 block">
                    Area / Thana
                  </label>
                  <input
                    placeholder="e.g. Dhanmondi 32"
                    className="w-full bg-stone-50 border-none rounded-xl p-3 text-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Final Address */}
            <div className="p-6 bg-white rounded-3xl border border-stone-100 shadow-sm">
              <label className="text-xs font-bold text-stone-400 mb-2 block uppercase tracking-widest">
                Street Address / Landmark
              </label>
              <textarea
                required
                rows={2}
                placeholder="House #, Flat #, Road Name..."
                className="w-full bg-stone-50 border-none rounded-xl p-3 text-stone-900 focus:ring-2 focus:ring-rose-500/20"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 flex items-center justify-center group"
            >
              {loading
                ? "Establishing Secure Connection..."
                : "Confirm & Arrange Care"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
