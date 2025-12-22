"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="btn btn-outline w-full flex items-center gap-2"
    >
      <FaGoogle className="text-red-500" /> Continue with Google
    </button>
  );
};
