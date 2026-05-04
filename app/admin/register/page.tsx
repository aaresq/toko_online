"use client";
import { BASE_API_URL } from "@/global";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = `${BASE_API_URL}/admins/`;
      const payload = JSON.stringify({ name, phone, username, password });

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "app-key": "948f791994e92c42a7457f8bd4b6db0e0cf04215",
        },
      });

      const data = response.data as { success: boolean; message: string };

      if (data.success) {
        toast(data.message, {
          containerId: "toastRegister",
          type: "success",
        });

        setTimeout(() => router.replace("/admin/login"), 1000);
      } else {
        toast(data.message, {
          containerId: "toastRegister",
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      toast("Something wrong", {
        containerId: "toastRegister",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <ToastContainer containerId="toastRegister" />

      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-8 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
          <div className="text-4xl font-bold">*</div>

          <div>
            <p className="text-sm opacity-80 mb-2">Join us</p>
            <h1 className="text-2xl font-bold leading-snug">
              Create your admin account and start managing 🚀
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Register as admin
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
                placeholder="Your phone"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
                placeholder="Username"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Sudah punya akun?{" "}
            <Link
              href="/admin/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;