import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    description: { type: String },
    descriptionBn: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    features: [
      {
        en: String,
        bn: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
