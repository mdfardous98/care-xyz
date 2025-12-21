"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name, nid, contact } = payload;

  //  1 Upper, 1 Lower, 6+ Characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message: "Password must be 6+ chars, 1 Upper, 1 Lower.",
    };
  }

  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) return { success: false, message: "User already exists" };

  const newUser = {
    name,
    email,
    contact,
    nid, 
    password: await bcrypt.hash(password, 10),
    role: "user",
    provider: "credentials",
  };

  const result = await dbConnect(collections.USERS).insertOne(newUser);
  return {
    ...result,
    insertedId: result.insertedId?.toString(),
    success: true,
  };
};
