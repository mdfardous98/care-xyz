import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
    try {
        const { name, email, password, nid, contact } = await request.json();

        if (!name || !email || !password || !nid || !contact) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

       
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json({
                error: "Password must be at least 6 characters, including 1 uppercase and 1 lowercase letter."
            }, { status: 400 });
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            nid,
            contact
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
