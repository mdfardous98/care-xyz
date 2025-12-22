import { getServices } from "@/actions/server/service";
import ServiceCard from "@/components/home/ServiceCard";

export const metadata = {
  title: "Home | Care.xyz",
  description: "Reliable babysitting, elderly care, and patient support.",
};

export default async function Home() {
  const services = await getServices();

  return (
    <main>
      <section className="hero min-h-[400px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold italic">
              Professional Care at Home
            </h1>
            <p className="py-6 text-gray-600">
              Making caregiving easy, secure, and accessible for every family
              member.
            </p>
            <button className="btn btn-primary">Explore Services</button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Featured Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
