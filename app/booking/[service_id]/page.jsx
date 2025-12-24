import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/api"; 
import { Suspense } from "react";

export const metadata = {
  title: "Book a Verified Caregiver | Care.xyz",
  description:
    "Schedule professional, background-checked caregiving services in minutes.",
};

export default async function BookingPage({ params }) {
  const { service_id } = await params;

 
  const service = await getServiceById(service_id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(at_top_right,#fff_0%,#fdfcfb_100%)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-stone-900/[0.02] -skew-y-3 origin-top-left -z-10"></div>

        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-2">
                Complete Your Booking
              </h1>
              <p className="text-stone-500">
                Review your service details and secure your appointment below.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
                  <p className="text-stone-500 font-medium animate-pulse">
                    Securing your session...
                  </p>
                </div>
              }
            >
              <BookingForm service={service} />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
