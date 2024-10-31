import React from "react";
import { motion, useInView } from "framer-motion";
import { AiOutlineCheck } from "react-icons/ai";

export default function Price() {
  const refLeft = React.useRef(null);
  const refRight = React.useRef(null);
  const isInViewLeft = useInView(refLeft, { once: true });
  const isInViewRight = useInView(refRight, { once: true });

  return (
    <div className="mt-8 p-14 w-full max-w-6xl mx-auto lg:w-[900px] px-4">
      <div>
        {/* Rating Section */}
        <div
          style={{ border: "1px solid gray" }}
          className="flex flex-col h-auto lg:h-[69px] lg:w-[400px] md:w-[500px] md:h-[69px] md:flex-row lg:flex-row items-center justify-between bg-white dark:bg-dark-gradient dark:border-red-600 mx-auto text-center rounded-3xl p-6 mb-14 space-y-4 lg:space-y-0 lg:space-x-6"
        >
          <p className="text-center">
            <b className="dark:text-white text-1xl">5.0</b>
            <span className="text-[#8987A1] dark:text-white"> Based On </span>
            <b className="dark:text-white">145 </b>
            <span className="text-[#8987A1] dark:text-white">Reviews </span>
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Schedule a Meeting (Left-to-Right Animation) */}
            <motion.div
              ref={refLeft}
              initial={{ x: -100, opacity: 0 }}
              animate={isInViewLeft ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:text-start sm:text-center md:mx-auto w-[282px] mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                  Pricing
                </h2>
                <p className="text-gray-500 dark:text-white mt-6">
                  Take a look at some of our recent projects to see how we've
                  helped businesses like yours succeed online.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-gradient p-6 rounded-2xl shadow-lg flex flex-col items-center lg:flex-1">
                <h3 className="text-xl sm:text-2xl text-start font-bold text-gray-800 dark:text-white mb-4">
                  Let's Schedule <br /> a Meeting
                </h3>
                <button className="bg-[#4E47FF] text-white py-2 px-6 sm:px-8 rounded-lg">
                  Schedule Meeting
                </button>
              </div>
            </motion.div>

            {/* Unlimited Services (Right-to-Left Animation) */}
            <motion.div
              ref={refRight}
              initial={{ x: 100, opacity: 0 }}
              animate={isInViewRight ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="dark:bg-dark-gradient p-6 rounded-2xl shadow-lg flex flex-col lg:flex-[2] space-y-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Unlimited Services
              </h3>
              <p className="text-[#8987A1] dark:text-white mb-6">
                Take a look at some of our recent projects to see how we've
                helped businesses like yours succeed online.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* First Column */}
                <ul className="space-y-4 flex-1">
                  {["Unlimited requests", "Front End Development", "Figma Design"].map((feature, index) => (
                    <li key={index} className="flex dark:text-white items-center">
                      <span className="w-6 h-6 flex items-center justify-center border border-black rounded-full mr-2">
                        <AiOutlineCheck className="w-4 h-4 text-black dark:text-white" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Second Column */}
                <ul className="space-y-4 flex-1">
                  {["Backend Development", "Web Development", "App Development"].map((feature, index) => (
                    <li key={index} className="flex dark:text-white items-center">
                      <span className="w-6 h-6 flex items-center justify-center border border-black rounded-full mr-2">
                        <AiOutlineCheck className="w-4 h-4 text-black dark:text-white" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and CTA */}
              <div className="bg-gray-100 dark:bg-dark-gradient p-6 rounded-lg flex items-center justify-between">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                  $3,250 <span className="text-lg font-normal text-[#8987A1] dark:text-white">/mo</span>
                </div>
                <button className="text-black dark:text-white text-2xl">
                  &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
