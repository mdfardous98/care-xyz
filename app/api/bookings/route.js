import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Service from "@/models/Service"; 
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, serviceId, date, userEmail, userName, rateType, location } =
      body;

    // 1. Validation
    if (!userEmail || !serviceId || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Price Verification 
    const service = await Service.findById(serviceId);
    if (!service)
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    const verifiedTotal = service.price; 

    // 3. User Resolution
    let dbUserId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      dbUserId = userId;
    } else {
      let user = await User.findOne({ email: userEmail.toLowerCase() });
      if (!user) {
        user = await User.create({
          name: userName || "Valued Client",
          email: userEmail.toLowerCase(),
          password: await bcrypt.hash(Math.random().toString(36), 12),
          role: "user",
        });
      }
      dbUserId = user._id;
    }

    // 4. Create Booking
    const newBooking = await Booking.create({
      user: dbUserId,
      serviceId,
      serviceTitle: service.title,
      date: new Date(date),
      totalCost: verifiedTotal,
      rateType: rateType || "hourly",
      location,
      status: "Pending",
    });

    // 5. Async Email 
    try {
      await transporter.sendMail({
        from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Booking Confirmed: ${service.title}`,
        html: generateEmailTemplate(
          userName,
          service.title,
          newBooking._id,
          date,
          verifiedTotal,
          rateType
        ),
      });
    } catch (mailError) {
      console.error("Non-blocking Mail Error:", mailError);
    }

    return NextResponse.json(
      { message: "Success", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json([], { status: 200 });

    const bookings = await Booking.find({ user: user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}


function generateEmailTemplate(name, title, id, date, cost, rate) {
  return `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #0f172a;">Booking Received</h2>
        <p>Hello ${
          name || "Client"
        }, your request for <strong>${title}</strong> is being processed.</p>
        <p><strong>Booking ID:</strong> #${id
          .toString()
          .slice(-8)
          .toUpperCase()}</p>
        <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
        <p><strong>Total:</strong> ৳${cost}</p>
        <a href="${
          process.env.NEXT_PUBLIC_API_URL
        }/my-bookings" style="background: #0f172a; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">View Status</a>
      </div>
    `;
}
