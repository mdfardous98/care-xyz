"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

// REGISTRATION ACTION
export const postUser = async (payload) => {
  const { email, password, name, nid, contact } = payload;

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

// LOGIN ACTION 
export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await dbConnect(collections.USERS).findOne({ email });

  if (!user) throw new Error("No user found");
  if (user.provider === "google") throw new Error("Use Google Login");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Invalid password");

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
