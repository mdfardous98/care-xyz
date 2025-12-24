import Link from "next/link";
import { getAllServices } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Professional Care Services | Care.xyz",
  description: "Browse our range of vetted, professional care solutions.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans">
      <Navbar />

      <div className="bg-white border-b border-stone-100 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/30 blur-[120px] rounded-full -mr-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-8 leading-[1.1]">
            Professional Care <br />
            for your <span className="text-stone-500 italic">loved ones.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Compassionate, vetted, and professional care solutions tailored to
            your unique family requirements.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        <Link
          href="/"
          className="inline-flex items-center text-stone-400 hover:text-stone-900 mb-12 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Back to Home
          </span>
        </Link>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services && services.length > 0 ? (
            services.map((service) => (
              <Link
                href={`/services/${service._id}`}
                key={service._id}
                className="group"
              >
                <div className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 h-full flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm">
                      {service.category}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <h2 className="text-2xl font-bold text-stone-900 mb-3 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-stone-500 mb-8 line-clamp-2 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-50">
                      <div>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">
                          Starts from
                        </p>
                        <span className="text-2xl font-bold text-stone-900">
                          ৳{service.price}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400">
              No services found. Check your database connection.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
