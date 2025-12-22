"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createBooking } from "@/lib/actions/bookingActions";

export default function BookingForm({ service }) {
  const router = useRouter();
  const [duration, setDuration] = useState(1);

  const totalCost = duration * service.price;

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      serviceId: service._id,
      serviceName: service.title,
      duration,
      totalCost,
      location: {
        division: form.division.value.trim(),
        district: form.district.value.trim(),
        city: form.city.value.trim(),
        address: form.address.value.trim(),
      },
    };

    try {
      const res = await createBooking(payload);

      if (res?.success) {
        Swal.fire({
          title: "Confirmed",
          text: "Check your email for the invoice!",
          icon: "success",
        });
        router.push("/my-bookings");
      } else {
        throw new Error("Booking failed");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Select Duration (Hours)</span>
        </label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="division"
          placeholder="Division"
          className="input input-bordered"
          required
        />
        <input
          name="district"
          placeholder="District"
          className="input input-bordered"
          required
        />
        <input
          name="city"
          placeholder="City"
          className="input input-bordered"
          required
        />
        <input
          name="address"
          placeholder="Area / Full Address"
          className="input input-bordered col-span-2"
          required
        />
      </div>

      <div className="bg-primary/10 p-4 rounded-lg flex justify-between items-center mt-6">
        <span className="text-lg font-semibold">Total Cost:</span>
        <span className="text-2xl font-bold text-primary">৳{totalCost}</span>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-4">
        Confirm Booking
      </button>
    </form>
  );
}
