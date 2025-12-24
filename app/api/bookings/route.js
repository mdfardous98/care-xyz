import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Service from "@/models/Service";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    
    const {
      userId,
      serviceId,
      serviceTitle,
      startDate,
      userEmail,
      userName,
      rateType,
      location,
      totalCost,
    } = body;

    // 1. Validation
    if (!userEmail || !serviceId || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields: Email, Service, or Date" },
        { status: 400 }
      );
    }

    // 2. Resolve User
    let dbUserId = userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      let user = await User.findOne({ email: userEmail.toLowerCase() });
      if (!user) {
        // Create a guest user 
        user = await User.create({
          name: userName || "Guest Client",
          email: userEmail.toLowerCase(),
          password: Math.random().toString(36).slice(-10),
          role: "user",
        });
      }
      dbUserId = user._id;
    }

    // 3. Create Booking
    const newBooking = await Booking.create({
      user: dbUserId,
      serviceId,
      serviceTitle,
      date: new Date(startDate),
      totalCost,
      rateType,
      location:
        typeof location === "object"
          ? `${location.address}, ${location.area}, ${location.district}`
          : location,
      status: "Pending",
    });

    return NextResponse.json(
      { message: "Success", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking Logic Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
