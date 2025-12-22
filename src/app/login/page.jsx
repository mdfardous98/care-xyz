"use client";
import { signIn } from "next-auth/react";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (res.error) Swal.fire("Error", "Invalid login", "error");
    else router.push("/");
  };

  return (
    <div className="flex justify-center p-10">
      <div className="card w-96 bg-base-100 shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <div className="divider">OR</div>
        <SocialButtons />
      </div>
    </div>
  );
}
