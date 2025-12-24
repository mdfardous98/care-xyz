"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  HeartPulse,
  BookmarkCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about-us" },
    ...(session
      ? [{ name: "My Bookings", href: "/my-bookings", icon: BookmarkCheck }]
      : []),
  ];

  const activeClass = "text-rose-600 bg-rose-50/50";
  const inactiveClass = "text-stone-600 hover:text-stone-900 hover:bg-stone-50";

  return (
    <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-[100] border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              {/* Logo  */}
              <div className="w-11 h-11 bg-stone-900 rounded-xl rotate-45 group-hover:rotate-[135deg] transition-all duration-500 ease-in-out" />
              <span className="absolute text-white font-black text-xl italic pointer-events-none">
                C
              </span>

              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-stone-900 tracking-tighter uppercase italic">
                Care<span className="text-rose-500 not-italic">.</span>xyz
              </span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] ml-1">
                Premium Support
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-2xl text-[13px] font-bold uppercase tracking-widest transition-all ${
                  pathname === item.href ? activeClass : inactiveClass
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-stone-100 mx-4" />

            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-stone-100 hover:border-stone-200 transition-all">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black uppercase">
                    {session.user.name[0]}
                  </div>
                  <span className="text-sm font-bold text-stone-700">
                    {session.user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-stone-400 group-hover:rotate-180 transition-transform" />
                </button>

                <div className="absolute right-0 top-[120%] w-56 bg-white rounded-3xl shadow-2xl border border-stone-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-6 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-[13px] font-bold uppercase tracking-widest text-stone-600 hover:text-stone-900 px-4"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-stone-900 text-white px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-stone-900"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-100 shadow-2xl px-6 py-8 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-black text-stone-900 tracking-tighter italic"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-stone-50 flex flex-col gap-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="text-left text-rose-600 font-bold"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/register"
                  className="w-full bg-stone-900 text-white py-5 rounded-3xl text-center font-black uppercase tracking-widest"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
