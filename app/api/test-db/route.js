import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const connectionState = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];

    return NextResponse.json({
      status: "Success",
      database: "MongoDB + Mongoose",
      connection: states[connectionState],
      host: mongoose.connection.host,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health Check Failed:", error.message);
    return NextResponse.json(
      {
        status: "Error",
        message: error.message,
        tip: "Check if MONGODB_URI is added to Vercel Settings and Redeploy.",
      },
      { status: 500 }
    );
  }
}
