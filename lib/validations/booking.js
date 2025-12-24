import { z } from "zod";

export const BookingSchema = z.object({
  serviceId: z.string().min(1),
  serviceTitle: z.string(),
  startDate: z.string().min(1, "Please select a date"),
  location: z.object({
    division: z.string().min(1),
    district: z.string().min(1),
    area: z.string().min(1),
    address: z.string().min(5),
  }),
  duration: z.number().positive(),
  rateType: z.enum(["hourly", "daily"]),
  totalCost: z.number().positive(),
});
