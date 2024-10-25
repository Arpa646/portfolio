"use client";

import React from "react";
import Link from "next/link"; // Next.js Link
import { FaBars } from "react-icons/fa"; // Import sun and moon icons
import { useUser } from "@/services";

// Assume this hook gets user details

// interface NavbarProps {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // Use this for navigation
import { logout } from "@/GlobalRedux/Features/auth/authSlice";
const Navbar2: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { role, token } = useUser(); // Assume role determines if the user is admin
  const toggleMenu = () => setIsOpen(!isOpen);

  // Check for token in localStorage
  const dispatch = useDispatch();
  const router = useRouter(); //
  const handleLogOut = () => {
    dispatch(logout()); // Call the logout action from the auth slice
    router.push("/"); // Redirect to login page
  };
  return (
    <nav className="bg-transparent absolute w-full pt-6 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button (left side) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className=" flex items-center justify-center sm:items-stretch sm:justify-start">
            <h3 className="text-3xl font-bold text-black dark:text-white">
              {/* Brand */}
            </h3>
          </div>

          {/* Desktop Menu */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1px solid #2B2B2B",
            }}
            className="hidden sm:block   sm:ml-6"
          >
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-white px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-white px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block text-white px-3 py-2 rounded-md text-base font-medium"
              >
                blog
              </Link>
              <Link
                href="/services"
                className="text-gray-700 dark:text-white px-3 py-2 text-sm font-medium"
              >
                Services
              </Link>
              {role === "admin" && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-white px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Dark Mode Toggle and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle button */}
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-800 dark:bg-gray-700 text-white rounded-full"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={20} />}
            </button> */}

            {/* Conditional Rendering for Sign In / Log Out */}
            {token ? (
              <button
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  border: "1px solid #2B2B2B",
                }}
                onClick={handleLogOut}
                className=" text-white px-4 py-2 rounded-lg text-sm"
              >
                Log Out
              </button>
            ) : (
              <Link
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  border: "1px solid #2B2B2B",
                }}
                href="/login"
              >
                <span className=" text-white px-5 h-9 rounded-lg text-sm">
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-4 py-4 space-y-1 bg-gray-800 dark:bg-gray-900">
          <Link
            href="/"
            className="block text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="block text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>

          <Link
            href="/services"
            className="block text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          {role === "admin" && (
            <Link
              href="/dashboard"
              className="block text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
          )}
          {token ? (
            <button
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid #2B2B2B",
              }}
              onClick={handleLogOut}
              className="block border text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Log Out
            </button>
          ) : (
            <Link
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid #2B2B2B",
              }}
              href="/login"
              className="block text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
