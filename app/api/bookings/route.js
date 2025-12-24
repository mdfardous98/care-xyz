import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      serviceId,
      date,
      totalCost,
      serviceTitle,
      userEmail,
      location,
      rateType,
    } = body;

    if ((!userId && !userEmail) || !serviceId || !totalCost) {
      return NextResponse.json(
        {
          error:
            "Required fields missing: userId/email, serviceId, and totalCost",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    let dbUserId = userId;
    const isValidId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidId) {
      let user = await User.findOne({ email: userEmail });
      if (!user) {
        user = await User.create({
          name: body.userName || "Valued Client",
          email: userEmail,
          password: await bcrypt.hash(Math.random().toString(36), 10),
          role: "user",
        });
      }
      dbUserId = user._id;
    }

    const newBooking = new Booking({
      user: dbUserId,
      serviceId: serviceId,
      serviceTitle: serviceTitle || "Care Service",
      date: new Date(date),
      totalCost,
      rateType: rateType || "hourly",
      status: "Pending",
    });

    await newBooking.save();

    try {
      await transporter.sendMail({
        from: `"Care.xyz Team" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Booking Confirmed: ${serviceTitle}`,
        html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #f0f0f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <div style="background: #0f172a; color: #ffffff; padding: 40px 20px; text-align: center;">
                            <div style="font-size: 28px; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px;">Care<span style="color: #fb7185;">.xyz</span></div>
                            <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; margin: 0; opacity: 0.7;">Official Booking Invoice</p>
                        </div>
                        <div style="padding: 40px; background: #ffffff;">
                            <h2 style="color: #1e293b; margin-top: 0; font-size: 22px;">Hello, ${
                              body.userName || "Client"
                            }</h2>
                            <p style="color: #475569; line-height: 1.6;">Your request for <strong>${serviceTitle}</strong> has been received. Our team is currently reviewing the schedule.</p>
                            
                            <div style="margin: 30px 0; padding: 20px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Booking ID</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace; font-weight: bold; color: #0f172a;">#${newBooking._id
                                          .toString()
                                          .slice(-8)
                                          .toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Schedule Date</td>
                                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #0f172a;">${new Date(
                                          date
                                        ).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Billing Basis</td>
                                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #0f172a; text-transform: capitalize;">${
                                          rateType || "hourly"
                                        }</td>
                                    </tr>
                                    <tr style="border-top: 1px solid #e2e8f0;">
                                        <td style="padding: 20px 0 0; color: #0f172a; font-weight: 700; font-size: 16px;">Total Amount</td>
                                        <td style="padding: 20px 0 0; text-align: right; font-size: 24px; font-weight: 800; color: #e11d48;">৳${totalCost}</td>
                                    </tr>
                                </table>
                            </div>

                            <a href="${
                              process.env.NEXT_PUBLIC_API_URL ||
                              "http://localhost:3000"
                            }/my-bookings" 
                               style="display: block; background: #0f172a; color: #ffffff; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px;">
                               Track Booking Status
                            </a>
                        </div>
                        <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #f1f5f9;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                Questions? Contact our support team at support@care.xyz<br>
                                &copy; ${new Date().getFullYear()} Care.xyz Professional Services.
                            </p>
                        </div>
                    </div>
                `,
      });
    } catch (e) {
      console.error("Mail Error:", e.message);
    }

    return NextResponse.json(
      { message: "Success", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();

    let query = {};
    if (session.user.id) {
      query.user = session.user.id;
    } else {
      const user = await User.findOne({ email: session.user.email });
      if (!user) return NextResponse.json([], { status: 200 });
      query.user = user._id;
    }

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Fetch failed", details: error.message },
      { status: 500 }
    );
  }
}
