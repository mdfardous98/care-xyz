"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const { status } = useSession();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push(searchParams.get("callbackUrl") || "/");
    }
  }, [status, router, searchParams]);

  const loginUser = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfcfb] px-4 font-sans relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-60 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-60 -ml-32 -mb-32"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 z-10"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-stone-500">
            Enter your credentials to access Care.xyz
          </p>
        </div>

        {registered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-medium text-center"
          >
            Account created! You can now sign in.
          </motion.div>
        )}

        <form className="mt-8 space-y-5" onSubmit={loginUser}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-2xl border border-stone-200 bg-stone-50/50 pl-12 p-4 text-stone-900 placeholder-stone-400 transition-all focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 sm:text-sm"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-2xl border border-stone-200 bg-stone-50/50 pl-12 p-4 text-stone-900 placeholder-stone-400 transition-all focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 sm:text-sm"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-medium text-center bg-rose-50 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-2xl bg-stone-900 px-4 py-4 text-sm font-semibold text-white transition-all hover:bg-stone-800 hover:shadow-lg active:scale-[0.98]"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign in to Account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-100" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
            <span className="bg-white px-4 text-stone-400">Secure SSO</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:border-stone-300 shadow-sm"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.-.19-.58z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-stone-500">
          New to Care.xyz?{" "}
          <Link
            href="/register"
            className="font-bold text-rose-600 hover:text-rose-500 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fdfcfb]">
          <div className="h-8 w-8 border-4 border-stone-200 border-t-rose-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
