import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-gray-100">
      <figure className="px-4 pt-4">
        <div className="relative h-48 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{service.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {service.description}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="font-bold text-primary">৳{service.price}/hr</span>
          <Link
            href={`/services/${service._id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
