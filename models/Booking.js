import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    date: { type: Date, required: true },
    totalCost: { type: Number, required: true },
    rateType: { type: String },
    location: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
