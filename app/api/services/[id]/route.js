import { NextResponse } from "next/server";
import { services } from "@/lib/servicesData";

export async function GET(request, { params }) {
    
    const resolvedParams = await params;
    const { id } = resolvedParams;

    try {
        const apiUrl = process.env.ZAPSHIFT_API_URL;

        if (!apiUrl) {
            const service = services.find(s => s._id === id);
            if (service) return NextResponse.json(service);
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        const res = await fetch(`${apiUrl}/${id}`, { next: { revalidate: 60 } });

        if (!res.ok) {
            const allRes = await fetch(apiUrl);
            if (allRes.ok) {
                const allServices = await allRes.json();
                const service = allServices.find(s => s._id === id || s.id === id);
                if (service) return NextResponse.json(service);
            }
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        const service = await res.json();
        return NextResponse.json(service);
    } catch (error) {
        console.error("Failed to fetch service:", error);

        const service = services.find(s => s._id === id);
        if (service) return NextResponse.json(service);

        return NextResponse.json({ error: "Failed to fetch service details" }, { status: 500 });
    }
}
