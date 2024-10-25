"use client";
import { useState, useEffect } from "react";

import Herosection2 from "./Herosection2";

import Slider from "./Slider";

import Footer from "./Footer";

import ContactForm from "./ContactForm";
import Timeline from "./Timeline";
import Skill from "./Skill";


import Button from "./Button";

export default function Home2() {
  const [darkMode, setDarkMode] = useState(true);

  // Check for dark mode preference on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Update the document class and local storage when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Toggle dark mode
  //const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div className="dark:bg-[#19191B] bg-[rgba(245,248,255,1)] mx-auto max-w-screen-xl">
      <div
        // style={{
        //   backgroundImage: `url(${img})`,
        //   backgroundPosition: "center -91px",
        //   backgroundSize: "85%",
        // }}
        className="bg-no-repeat bg-cover   "
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="custom">
            {/* <Navbar2 darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
            <Herosection2 />
            <div className="flex flex-wrap mx-auto gap-7 w-2/2 justify-center">
              <Button count="1000" data=" Commits" />
              <Button count="20" data=" Project" />
              <Button count="2" data="running" />
            </div>

            <Timeline></Timeline>

            {/* <Card /> */}
            <Skill></Skill>
          </div>

          <Slider darkMode={darkMode} />

          {/* <Price />
          <Faq darkMode={darkMode} /> */}
          <hr />
          {/* Footer Section */}
          <div className="w-full custom">
            <ContactForm />
            <Footer darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
