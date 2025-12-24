import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
    try {
        const uri = process.env.MONGODB_URI;
        const maskedUri = uri ? uri.replace(/:([^:@]+)@/, ':****@') : "UNDEFINED";

        console.log("Test Route - Env URI:", maskedUri);

        const client = await clientPromise;
        const db = client.db();
        
        await db.command({ ping: 1 });

        return NextResponse.json({
            status: "Connected",
            uri: maskedUri,
            message: "Successfully connected to MongoDB"
        });
    } catch (error) {
        return NextResponse.json({
            status: "Error",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
