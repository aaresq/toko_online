"use client"
import Link from "next/link";
import { BASE_API_URL } from '@/global';
import { storeCookie } from "@/lib/client-cookies"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

type responseLogin = {
  status: boolean
  message: string
  token?: string
  user?: User
}
type User = {
  email: string
  id: number
  nama_user: string
  role: string
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 🔥 DEBUG lagi pas klik login
    console.log("BASE_API_URL (submit):", BASE_API_URL)

    try {
      const url = `${BASE_API_URL}/auth/login`
      console.log("FINAL URL:", url) // biar keliatan full URL

      const payload = JSON.stringify({ email, password })

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data: responseLogin = response.data

      if (data.status) {
        if (data.user?.role === "admin") {
          toast(data.message, { containerId: "toastLogin", type: "success" })
          storeCookie("token", data.token || "")
          storeCookie("role", data.user?.role || "")
          setTimeout(() => router.replace(`/admin/dashboard`), 1000)
        } else {
          toast("Anda Bukan Admin!", { containerId: "toastLogin", type: "warning" })
        }
      } else {
        toast(data.message, { containerId: "toastLogin", type: "warning" })
      }
    } catch (error) {
      console.log(error)
      toast("Something wrong", { containerId: "toastLogin", type: "error" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <ToastContainer containerId="toastLogin" />

      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-8 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
          <div className="text-4xl font-bold">*</div>
          <div>
            <p className="text-sm opacity-80 mb-2">Welcome back</p>
            <h1 className="text-2xl font-bold">
              Manage your dashboard easily 🚀
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Login</h1>
          <p className="text-gray-500 text-sm mb-6">
            Access your admin dashboard
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <Link href="/admin/register" className="text-orange-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage