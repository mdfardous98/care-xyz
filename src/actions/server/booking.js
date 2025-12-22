"use server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const createBooking = async (payload) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, message: "Unauthorized" };

  const newBooking = {
    ...payload,
    userId: new ObjectId(session.user._id),
    userEmail: session.user.email,
    status: "Pending",
    createdAt: new Date(),
  };

  const result = await dbConnect(collections.BOOKINGS).insertOne(newBooking);
  return {
    success: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};
