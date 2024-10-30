import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import Photo from "./Photo";
import PDFDownload from "./PDFDownload";

const Herosection2: React.FC = () => {
  
  return (
    <section className="px-4  pt-44   py-8 sm:px-8 lg:px-16 lg:py-36">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between lg:space-x-8">
        {/* Left Section: Text and Social Icons */}
        <div className="text-section lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <p className="job-title text1xl sm:text-xl font-semibold mb-2 sm:mb-4">
            Software Developer
          </p>
          <h1  className="main-title text-white text-1xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Hello Im <span 
            style={{color:"#7271EB"}}
            
            className=" ">Arpa Akter</span>
          </h1>
          <p className="description text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
            I excel at crafting elegant digital experiences and am proficient in
            various programming languages and technologies.
          </p>

          <PDFDownload />

          <div className="social-icons text-white flex justify-center lg:justify-start space-x-4 mt-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a href="mailto:email@example.com" aria-label="Email">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        {/* Right Section: Profile Picture */}
        <div className="">
          <Photo />
        </div>
      </div>
    </section>
  );
};

export default Herosection2;
