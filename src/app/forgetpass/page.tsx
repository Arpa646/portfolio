"use client"; // Ensures this is a client component in Next.js

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { useForgottenPassMutation } from "@/GlobalRedux/api/api";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router
  const [forgotPass] = useForgottenPassMutation();

  const [formData, setFormData] = useState<LoginForm>({
    email: "mdbadol290@gmail.com",
    password: "user",
  });

  const [, setErrorMessage] = useState<string>("");

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
      await forgotPass(formData).unwrap(); // Ensure type safety with 'unwrap'
      router.push("/login"); // Redirect to login page after sending the email
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to send recovery email: ${error.message}`);
      } else {
        setErrorMessage("Failed to send recovery email."); // Handle non-Error cases
      }
    }
  };
  

  return (
    <div className="bg-white pt-6 p-10 min-lg:h-[900px] shadow-xl lg:w-[700px] sm:w-[500px] md:w-[700px] mx-auto">
      <div className="divider"></div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full flex flex-col items-center"
      >
        <h1 className="text-2xl font-medium" style={{ color: "#4F5C6E" }}>
          Send a email recovery pass
        </h1>

        <div className="flex flex-col items-center space-y-5 w-full">
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR EMAIL
                <span style={{ color: "red" }}>*</span>
              </h1>
              <div className="relative w-full">
                <input
                  style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="hover:border-sky-700 input-bordered h-9 w-full pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="relative w-full">
              <button
                type="submit"
                style={{ backgroundColor: "#3CB95D", borderRadius: "4px" }}
                className="input hover:bg-sky-500 h-9 font-semibold text-white w-full pl-10"
              >
                SENT EMAIL
              </button>
            </div>
          </div>

          <div>-OR-</div>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full text-center"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
