import { getSingleService } from "@/actions/server/service";
import BookingForm from "@/components/forms/BookingForm";

export default async function BookingPage({ params }) {
  const service = await getSingleService(params.id);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-3xl font-bold mb-2">Complete Your Booking</h2>
        <p className="text-gray-500 mb-8 border-b pb-4">
          Service:{" "}
          <span className="text-black font-semibold">{service.title}</span>
        </p>
        <BookingForm service={service} />
      </div>
    </div>
  );
}
