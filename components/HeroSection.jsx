"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Shield,
  Clock,
  Heart,
  Users,
} from "lucide-react";

const sliderImages = [
  "/hero-care.png",
  "https://images.unsplash.com/photo-1570657891791-e39a9d185540?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1632052999485-d748103abf98?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-[#fdfcfb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-widest mb-8"
            >
              <Shield className="w-3.5 h-3.5 mr-2" />
              Elite Care Network — BD
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tighter text-stone-900 leading-[0.95] mb-8 italic"
            >
              Care without <br />
              <span className="text-rose-500 not-italic">Compromise.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-stone-500 mb-12 max-w-lg leading-relaxed font-medium"
            >
              Connecting Dhaka is discerning families with rigorously vetted,
              compassionate caregivers. Because your loved ones deserve more
              than just assistance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 mb-16"
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-10 py-5 text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200"
              >
                Book Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center px-10 py-5 text-sm font-black uppercase tracking-widest rounded-2xl text-stone-900 bg-white border border-stone-100 hover:bg-stone-50 transition-all">
                <PlayCircle className="mr-2 w-5 h-5 text-rose-500" />
                Our Standards
              </button>
            </motion.div>

            {/* High-End Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-12 pt-10 border-t border-stone-100"
            >
              {[
                { label: "Vetted Caregivers", val: "500+", Icon: Users },
                { label: "Uptime Support", val: "24/7", Icon: Clock },
                { label: "Safety Rating", val: "99.9%", Icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black text-stone-900 tracking-tighter italic">
                    {stat.val}
                  </span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] aspect-[4/5] lg:aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={sliderImages[currentImage]}
                  initial={{ opacity: 0, filter: "grayscale(100%)" }}
                  animate={{ opacity: 1, filter: "grayscale(0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  alt="Caregiving"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <p className="font-black text-stone-900 tracking-tight text-lg leading-none">
                        Immediate Availability
                      </p>
                      <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-1">
                        Dhaka Division
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Artistic Accents */}
            <div className="absolute -z-10 -top-12 -right-12 w-72 h-72 bg-rose-100 rounded-full blur-[100px] opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
