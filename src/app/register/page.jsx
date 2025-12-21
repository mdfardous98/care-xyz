"use client";
import { postUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.contact.value,
      nid: form.nid.value,
      password: form.password.value,
    };

    const res = await postUser(payload);
    if (res.success) {
      Swal.fire("Success", "Account created!", "success");
      router.push("/login");
    } else {
      Swal.fire("Error", res.message, "error");
    }
  };

  return (
    <div className="flex justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          name="name"
          placeholder="Name"
          className="input input-bordered"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered"
          required
        />
        <input
          name="contact"
          placeholder="Phone"
          className="input input-bordered"
          required
        />
        <input
          name="nid"
          placeholder="NID Number"
          className="input input-bordered"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered"
          required
        />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
