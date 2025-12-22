import { getSingleService } from "@/actions/server/service";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const service = await getSingleService(params.id);
  return { title: `${service?.title || "Service"} | Care.xyz` };
}

export default async function ServiceDetails({ params }) {
  const service = await getSingleService(params.id);

  if (!service)
    return <div className="text-center py-20">Service not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        <image
          src={service.image}
          className="rounded-2xl shadow-lg w-full"
          alt={service.title}
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-2xl text-primary font-bold mb-6">
            Price: ৳{service.price} / hour
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            {service.description}
          </p>
          <Link
            href={`/booking/${service._id}`}
            className="btn btn-primary btn-block"
          >
            Book This Service
          </Link>
        </div>
      </div>
    </div>
  );
}
