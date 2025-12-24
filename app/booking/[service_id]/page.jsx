import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";

async function getService(id) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/services/${id}`,
      { cache: "no-store" }
    );
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export const metadata = {
  title: "Book a Verified Caregiver | Care.xyz",
  description:
    "Schedule professional, background-checked caregiving services in minutes. Secure, compassionate, and reliable support for your loved ones, tailored to your needs.",
};

import { Suspense } from "react";

export default async function BookingPage({ params }) {
  const resolvedParams = await params;
  const { service_id } = resolvedParams;

  const service = await getService(service_id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(at_top_right,#fff_0%,#fdfcfb_100%)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-stone-900/[0.02] -skew-y-3 origin-top-left -z-10"></div>

        <Suspense
          fallback={
            <div className="flex-grow py-20 px-6 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 font-medium animate-pulse">
                Securing your session...
              </p>
            </div>
          }
        >
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

              <BookingForm service={service} />
            </div>
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
