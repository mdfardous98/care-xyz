import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-stone-50 border border-stone-100 mb-4 shadow-sm">
            <Search className="h-8 w-8 text-stone-400" />
          </div>

          <h1 className="text-8xl font-bold text-stone-900 tracking-tighter">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-900">
              Something went wrong.
            </h2>
            <p className="text-stone-500 max-w-sm mx-auto leading-relaxed">
              We could not find the page you are looking for. It might have been
              moved or does not exist anymore.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 py-4 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-[0.98]"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
