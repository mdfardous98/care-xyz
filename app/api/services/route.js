import { NextResponse } from "next/server";
import { services } from "@/lib/servicesData";

export async function GET() {
    try {
        const apiUrl = process.env.ZAPSHIFT_API_URL;

        if (!apiUrl) {
            console.warn("ZAPSHIFT_API_URL is not defined. Returning mock data.");
            return NextResponse.json(services);
        }

        const res = await fetch(apiUrl, { next: { revalidate: 60 } });

        if (!res.ok) {
            throw new Error(`External API error: ${res.status}`);
        }

        const externalServices = await res.json();
        return NextResponse.json(externalServices);
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return NextResponse.json(services);
    }
}
