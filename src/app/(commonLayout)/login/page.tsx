"use client"; // Ensures this is a client component in Next.js

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router instead of useNavigate
import { setUser } from "@/GlobalRedux/Features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verify";
import { useLogInMutation } from "@/GlobalRedux/api/api";
import Link from "next/link"; // Next.js Link for navigation
import { useDispatch } from "react-redux";
import { setCookie } from "nookies";

type ApiError = {
  status?: number;
  message?: string;
};

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [LogIn] = useLogInMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await LogIn(formData).unwrap();

      if (response.token) {
        const user = verifyToken(response.token);
        dispatch(setUser({ user, token: response.token }));
        setCookie(null, "token", response.token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
        setCookie(null, "user", JSON.stringify(user), { maxAge: 30 * 24 * 60 * 60, path: "/" });
        toast.success("Login successful!");
        router.push("/");
      } else {
        setErrorMessage("Wrong email or password.");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.status === 500 || apiError.status === 400 ? "Wrong email or password." : "An unexpected error occurred. Please try again.");
    }
  };

  const handleLoginAsUser = () => setFormData({ email: "mdbadol290@gmail.com", password: "123456" });
  const handleLoginAsAdmin = () => setFormData({ email: "adminrubab@gmail.com", password: "arpa" });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-purple-900 relative">
      <div className="relative z-10 w-full max-w-md p-8 bg-opacity-30 bg-black backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-4">Login </h2>
        <p className="text-gray-300 text-center mb-6">Glad you're back!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

          <div className="flex items-center justify-between">
            <button type="button" onClick={handleLoginAsUser} className="bg-transparent border border-gray-600 text-white font-bold py-2 px-4 rounded">
              Login as User
            </button>
            <button type="button" onClick={handleLoginAsAdmin} className="bg-transparent border border-gray-600 text-white font-bold py-2 px-4 rounded">
              Login as Admin
            </button>
          </div>

          <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity">
            Log In
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400">
          <Link href="/forgetpass" className="text-sm hover:underline">Forgot password?</Link>
        </div>

        <div className="flex items-center mt-6">
          <span className="flex-grow border-t border-gray-700"></span>
          <span className="px-4 text-gray-500">Or</span>
          <span className="flex-grow border-t border-gray-700"></span>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account? <Link href="/register" className="text-purple-400 hover:underline">Create an account</Link>
        </div>
      </div>

      {/* Background gradient decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply opacity-30 filter blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply opacity-30 filter blur-2xl"></div>
    </div>
  );
};

export default LoginPage;
