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
  const router = useRouter(); // Next.js router
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
    setErrorMessage(""); // Reset error message

    try {
      const response = await LogIn(formData).unwrap(); // Ensure type safety with 'unwrap'

      if (response.token) {
        const user = verifyToken(response.token); // Ensure this function is properly defined
        dispatch(setUser({ user: user, token: response.token }));
        setCookie(null, "token", response.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days expiry
          path: "/", // Cookie is accessible across the entire site
        });

        setCookie(null, "user", JSON.stringify(user), {
          maxAge: 30 * 24 * 60 * 60, // 30 days expiry
          path: "/", // Cookie is accessible across the entire site
        });

        toast.success("Login successful!");
        router.push("/"); // Use router.push instead of navigate()

        console.log("Login successful:", response.token);
      } else {
        setErrorMessage("Wrong email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);

      const apiError = error as ApiError;

      if (apiError.status === 500 || apiError.status === 400) {
        setErrorMessage("Wrong email or password.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleLoginAsUser = () => {
    setFormData({ email: "mdbadol290@gmail.com", password: "123456" });
  };

  const handleLoginAsAdmin = () => {
    setFormData({ email: "adminrubab@gmail.com", password: "arpa" });
  };

  return (
    <div className="flex custom items-center justify-center h-screen">
      {" "}
      {/* Full-screen height and center horizontally/vertically */}
      <div className=" p-10 shadow-xl lg:w-[700px] sm:w-[500px] md:w-[700px] w-full max-w-lg">
        {" "}
        {/* Add 'w-full' and 'max-w-lg' for responsiveness */}
        <div className="divider"></div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full flex flex-col items-center"
        >
          <h1 className="text-2xl font-medium" style={{ color: "#4F5C6E" }}>
            Login to <span>FOODU</span>
          </h1>

          <div className="flex flex-col items-center space-y-5 w-full">
            {/* Email Input */}
            <div className="w-full lg:w-[500px] flex flex-col items-center">
              <div className="space-y-1 w-full">
                <label
                  htmlFor="email"
                  className="block text-start text-sm font-semibold text-gray-700"
                >
                  PLEASE ENTER YOUR EMAIL
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="w-full px-4 py-3   border border-gray-600 bg-transparent text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="w-full lg:w-[500px] flex flex-col items-center">
              <div className="space-y-1 w-full">
                <label
                  htmlFor="password"
                  className="block text-start text-sm font-semibold text-gray-700"
                >
                  PLEASE ENTER YOUR PASSWORD
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="w-full px-4 py-3  bg-transparent border border-gray-600  text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errorMessage && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
              <div className="relative w-full flex justify-between">
                <button
                  type="button"
                  onClick={handleLoginAsUser}
                  className="bg-transparent border border-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login as User
                </button>
                <button
                  type="button"
                  onClick={handleLoginAsAdmin}
                  className="bg-transparent border border-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login as Admin
                </button>
              </div>

              <div className="relative w-full">
                <button
                  type="submit"
                  className="input  bg-transparent border border-gray-600 h-12 font-semibold text-white w-full pl-10"
                >
                  Log In
                </button>
              </div>
            </div>

            <Link href="/forgetpass">
              <h3 style={{ color: "#0088FF", borderRadius: "4px" }}>
                Recover your password
              </h3>
            </Link>
            <div>-OR-</div>
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full text-center">
                <Link
                  className="text-xs font-bold underline underline-offset-4"
                  href="/register" // Changed to Next.js 'Link' component
                  style={{ color: "#3CB95D" }}
                >
                  CREATE ACCOUNT ON <span>FOODU</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
