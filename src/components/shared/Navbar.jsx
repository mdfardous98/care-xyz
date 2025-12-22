"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 shadow px-10">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Care.xyz
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link href="/">Home</Link>
        {session ? (
          <>
            <Link href="/my-bookings">My Bookings</Link>
            <button onClick={() => signOut()} className="btn btn-error btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
