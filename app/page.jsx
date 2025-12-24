import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import {
  ArrowRight,
  Star,
  Heart,
  Shield,
  Clock,
  Search,
  UserCheck,
  Calendar,
  CheckCircle,
  Users,
  Activity,
  Baby,
  Stethoscope,
  MapPin,
} from "lucide-react";

async function getServices() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/services`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3);
  } catch (e) {
    return [];
  }
}

function getServiceConfig(category) {
  const configs = {
    Baby: { icon: <Baby />, bg: "bg-rose-50", text: "text-rose-600" },
    Elderly: { icon: <Heart />, bg: "bg-stone-100", text: "text-stone-600" },
    Sick: { icon: <Stethoscope />, bg: "bg-stone-100", text: "text-stone-600" },
  };
  return (
    configs[category] || {
      icon: <Activity />,
      bg: "bg-stone-50",
      text: "text-stone-500",
    }
  );
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans text-stone-900">
      <Navbar />
      <HeroSection />

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight">
              Care Solutions for Every Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service) => {
              const config = getServiceConfig(service.category);
              return (
                <div
                  key={service._id}
                  className="group p-10 rounded-[2.5rem] border border-stone-100 bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                  <div
                    className={`w-14 h-14 ${config.bg} ${config.text} rounded-2xl flex items-center justify-center mb-8`}
                  >
                    {config.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider group-hover:text-rose-500 transition-colors"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {[
            { label: "Families Helped", value: "10k+", icon: Users },
            { label: "Vetted Staff", value: "500+", icon: UserCheck },
            { label: "Live Support", value: "24/7", icon: Clock },
            { label: "Locations", value: "Dhaka", icon: MapPin },
          ].map((stat, i) => (
            <div key={i}>
              <stat.icon className="w-6 h-6 mx-auto mb-4 text-stone-400" />
              <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
              <p className="text-stone-500 text-xs uppercase tracking-widest font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-stone-100 rounded-[3rem] p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to find a caregiver?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-10 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="px-10 py-4 bg-white text-stone-900 border border-stone-200 font-bold rounded-2xl hover:bg-stone-50 transition-all"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
