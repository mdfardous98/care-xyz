import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password, nid, contact } = await req.json();

        if (!name || !email || !password || !nid || !contact) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Password Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                {
                    message:
                        "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.",
                },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            nid,
            contact,
            createdAt: new Date(),
        };

        await db.collection("users").insertOne(newUser);

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
