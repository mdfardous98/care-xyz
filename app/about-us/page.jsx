import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Heart, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Our Mission & Safety Standards | Care.xyz",
  description:
    "Discover how Care.xyz is redefining home care. We bridge the gap between families and verified, compassionate caregivers through rigorous screening and a heart-first approach.",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans text-stone-900">
      <Navbar />

      {/* Hero Section - */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 rounded-full">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 mb-8">
            The heart of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-violet-600">
              Care.xyz
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
            Our mission is to bridge the gap between families and elite
            caregiving. We believe every home deserves the security of{" "}
            <span className="text-stone-900 font-medium">
              certified experts
            </span>{" "}
            and the comfort of{" "}
            <span className="text-stone-900 font-medium">
              uncompromising compassion
            </span>
            . Peace of mind is not a luxury—it’s our standard.
          </p>
        </div>
      </section>

      {/* Mission Section -  */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 right-4 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

              <Image
                src="https://images.unsplash.com/photo-1762608206423-be8c07645de7?auto=format&fit=crop&q=80&w=1200"
                alt="Caregiver providing support"
                width={1200}
                height={1500}
                priority={true}
                className="relative rounded-2xl shadow-2xl object-cover aspect-[4/5] lg:aspect-square w-full"
              />
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                  Dignity in Care,{" "}
                  <span className="text-rose-600">Certainty</span> for Families
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed italic border-l-4 border-rose-500 pl-6">
                  Care.xyz was born from a singular realization: the search for
                  care is a search for trust. From neonatal support to geriatric
                  companionship, we eliminate the friction of uncertainty. We do
                  not just find help; we secure the sanctuary of your home.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  {
                    icon: Shield,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                    title: "Vetted Excellence",
                    text: "Multi-layered background checks and identity verification for absolute safety.",
                  },
                  {
                    icon: Heart,
                    color: "text-rose-600",
                    bg: "bg-rose-50",
                    title: "Patient-First Care",
                    text: "We select for emotional intelligence and empathy, not just technical skill.",
                  },
                  {
                    icon: Sparkles,
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                    title: "The Top 5% Standard",
                    text: "Our rigorous 12-step vetting process ensures only elite professionals join us.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-6 p-4 rounded-xl transition-colors hover:bg-stone-50"
                  >
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-stone-500 leading-snug">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section -  */}
      <section className="bg-stone-950 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-900/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Hours of Specialized Care", value: "250k+" },
              { label: "Verified Caregivers", value: "500+" },
              { label: "Safety Success Rate", value: "100%" },
              { label: "Client Retention", value: "94%" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 group">
                <div className="text-5xl font-extrabold text-white tracking-tighter group-hover:text-rose-500 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
