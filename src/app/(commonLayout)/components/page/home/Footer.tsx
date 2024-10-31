import React from "react";
import { FaTiktok, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing React Icons

// import Image from "next/image";
interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="h-auto mt-7  py-10">
      <div className="w-[90%] lg:w-[1000px] mx-auto py-12">
        <div className=" dark:bg-dark-gradient rounded-3xl shadow-lg p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            {/* Left Section */}
            <div className="flex flex-col items-center w-full lg:w-[300px] lg:items-start space-y-4 lg:space-y-6">
              <div className="flex items-center space-x-2">
                {/* <Image
                width={}
                height={}
                  src={
                    darkMode ? Logo3 : Logo4 // Conditional logo based on darkMode
                  }
                  alt="Logo"
                  className="w-[150px] sm:w-[180px] lg:w-[200px]"
                /> */}
              </div>
              <p className="text-[#8987A1] dark:text-[#F5F5F5] text-center lg:text-left">
                Ready to elevate your online presence? Contact us today to
                discuss your project and discover how we can bring your vision
                to life.
              </p>
              <p className="text-sm text-[#8987A1] dark:text-white flex items-center">
                <span className="me-2">❤️</span> Made with love powered by
                <a
                  href="https://inkyy.com"
                  className="text-indigo-500 dark:text-white ms-2"
                >
                  inkyy.com
                </a>
              </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-28 mt-6 lg:mt-0 items-center">
              {/* Navigation Links */}
              <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 mt-6 lg:mt-0 dark:text-white text-gray-500">
                <a href="#" className="hover:text-indigo-600">
                  Home
                </a>
                <a href="#" className="hover:text-indigo-600">
                  About
                </a>
                <a href="#" className="hover:text-indigo-600">
                  How it Works
                </a>
                <a href="#" className="hover:text-indigo-600">
                  Services
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6 lg:mt-0">
                <a href="#" className="hover:opacity-80">
                  <FaTiktok className="h-6 w-6 dark:text-white" />
                </a>
                <a href="#" className="hover:opacity-80">
                  <FaInstagram className="h-6 w-6 dark:text-white" />
                </a>
                <a href="#" className="hover:opacity-80">
                  <FaLinkedin className="h-6 w-6 dark:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
