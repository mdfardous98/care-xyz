"use client";
import { useState } from "react";

export default function BookingForm({ service }) {
  const [duration, setDuration] = useState(1);
  const totalCost = duration * service.price;

  return (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Select Duration (Hours)</span>
        </label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input input-bordered w-full"
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
          className="input input-bordered"
          required
        />
      </div>

      <div className="bg-primary/10 p-4 rounded-lg flex justify-between items-center mt-6">
        <span className="text-lg font-semibold">Total Cost:</span>
        <span className="text-2xl font-bold text-primary">৳{totalCost}</span>
      </div>

      <button className="btn btn-primary w-full mt-4">Confirm Booking</button>
    </div>
  );
}
