import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";
import BookingItem from "@/components/BookingItem";
import mongoose from "mongoose";

async function getMyBookings(userId, email) {
  try {
    await dbConnect();
    let query = {};
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query.user = userId;
    } else if (email) {
      const user = await User.findOne({ email }).lean();
      if (!user) return [];
      query.user = user._id;
    } else return [];

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Data Fetch Error:", error);
    return [];
  }
}

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    redirect("/api/auth/signin?callbackUrl=/my-bookings");

  const bookings = await getMyBookings(session.user.id, session.user.email);

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-6 lg:px-8 py-16 w-full">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-stone-900 tracking-tight mb-2">
            My Bookings
          </h1>
          <p className="text-stone-500">
            Manage your scheduled care and review service history.
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="bg-stone-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🗓️</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-2">
              No appointments found
            </h3>
            <p className="text-stone-500 mb-8 max-w-xs mx-auto">
              You have not booked any care services yet. Let us find the right
              support for you.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800"
            >
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <BookingItem booking={booking} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
