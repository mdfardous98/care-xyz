"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  CreditCard,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { status } = useSession();

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const registerUser = async (e) => {
    e.preventDefault();

    // Strict Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setError(
        "Security Requirement: 6+ characters, mix of uppercase & lowercase."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/login?registered=true");
      } else {
        setError(
          result.error ||
            result.message ||
            "Registration failed. Please check your data."
        );
      }
    } catch (err) {
      setError("A network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfcfb] px-4 py-16 relative overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-50/60 rounded-full blur-3xl -ml-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-100/60 rounded-full blur-3xl -mr-48 -mb-48 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-8 rounded-[2.5rem] bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-stone-100 z-10"
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 text-white mb-6 shadow-xl shadow-stone-200">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">
            Create Account
          </h2>
          <p className="mt-2 text-stone-500">
            Join Care.xyz for professional home care.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={registerUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              icon={<User size={18} />}
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={handleChange}
            />
            <InputGroup
              icon={<Phone size={18} />}
              name="contact"
              placeholder="Phone Number"
              value={data.contact}
              onChange={handleChange}
            />
          </div>

          <InputGroup
            icon={<Mail size={18} />}
            name="email"
            type="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleChange}
          />

          <InputGroup
            icon={<CreditCard size={18} />}
            name="nid"
            placeholder="NID Number"
            value={data.nid}
            onChange={handleChange}
          />

          <InputGroup
            icon={<Lock size={18} />}
            name="password"
            type="password"
            placeholder="Secure Password"
            value={data.password}
            onChange={handleChange}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-semibold text-rose-600 bg-rose-50 p-4 rounded-2xl text-center border border-rose-100"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-2xl bg-stone-900 py-4 text-sm font-bold text-white transition-all hover:bg-stone-800 hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "Processing Securely..." : "Create Account"}
            {!loading && <UserPlus className="ml-2 h-4 w-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-stone-900 hover:underline transition-all"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}


function InputGroup({ icon, ...props }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        required
        className="block w-full rounded-2xl border border-stone-200 bg-stone-50/40 pl-12 p-4 text-stone-900 placeholder-stone-400 transition-all focus:border-stone-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-stone-900/5 sm:text-sm"
      />
    </div>
  );
}
