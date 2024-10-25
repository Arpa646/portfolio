"use client";

import { useState } from "react";
import { useSignUpMutation } from "@/GlobalRedux/api/api"; // Update the path accordingly

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // Default value
    address: "",
  });

  const [addRegister] = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addRegister(formData); // Triggering mutation with form data
      console.log("Registration successful", formData);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="mt-14  flex flex-col custom  items-center justify-center px-4">
      <div className="w-full max-w-lg px-8 rounded-lg">
        <h1 className="text-4xl dark:text-white font-bold text-center mb-8 font-raleway">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-start text-lg font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#D6DDED] bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-start text-lg font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#D6DDED] bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-start text-lg font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#D6DDED] bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-start text-lg font-semibold text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#D6DDED] bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="address"
              className="block text-start text-lg font-semibold text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#D6DDED] bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#4E47FF] text-white text-lg rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
