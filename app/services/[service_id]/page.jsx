import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  UserCheck,
  Star,
  Heart,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import PricingCard from "@/components/PricingCard";

async function getService(id) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/services/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { service_id } = await params;
  const service = await getService(service_id);
  return { title: service?.title || "Service Details" };
}

export default async function ServiceDetailPage({ params }) {
  const { service_id } = await params;
  const service = await getService(service_id);
  const session = await getServerSession(authOptions);

  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-6 lg:px-8 py-12 w-full">
        {/* Navigation */}
        <Link
          href="/services"
          className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Back to Catalog
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Hero Image & Identity */}
            <section className="space-y-6">
              <div className="aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-stone-900 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                    {service.category}
                  </span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-2xl text-stone-400 mt-2 font-medium font-bengali">
                  {service.titleBn}
                </p>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-stone-100 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                About This Service
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
                <p>{service.description}</p>
                <p className="font-bengali text-stone-500 italic bg-stone-50 p-6 rounded-2xl border-l-4 border-stone-200">
                  {service.descriptionBn}
                </p>
              </div>
            </section>

            {/* Features Grid */}
            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-8">
                What is Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-4 bg-white rounded-2xl border border-stone-50 shadow-sm transition-hover hover:border-stone-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center mr-4 shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-stone-900 font-semibold">
                        {typeof feature === "string" ? feature : feature.en}
                      </p>
                      {feature.bn && (
                        <p className="text-stone-400 text-xs font-bengali">
                          {feature.bn}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-stone-100">
              <TrustBadge
                icon={<ShieldCheck className="w-6 h-6" />}
                text="Certified Staff"
              />
              <TrustBadge
                icon={<UserCheck className="w-6 h-6" />}
                text="Background Checked"
              />
              <TrustBadge
                icon={<Star className="w-6 h-6" />}
                text="5-Star Quality"
              />
            </div>
          </div>

          {/* Right Column: Sticky Pricing */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-28 transition-transform duration-500">
              <PricingCard service={service} session={session} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="text-stone-400">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
        {text}
      </span>
    </div>
  );
}
