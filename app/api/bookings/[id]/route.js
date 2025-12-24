import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { status } = await request.json();

        if (status !== 'Cancelled') {
            return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        const booking = await Booking.findOne({ _id: id, user: user._id });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        if (booking.status !== 'Pending') {
            return NextResponse.json({ error: "Only pending bookings can be cancelled" }, { status: 400 });
        }

        booking.status = 'Cancelled';
        await booking.save();

        return NextResponse.json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        console.error("Cancel booking error:", error);
        return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
    }
}
