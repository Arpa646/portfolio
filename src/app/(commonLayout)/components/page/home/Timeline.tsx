import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Timeline = () => {
  const timelineData = [
    {
      year: "2021",
      title: "High School",
      description: "Bagerhat Govt High School",
    },
    {
      year: "2023",
      title: "College",
      description: "Bagerhat Govt Mohila College",
    },
    {
      year: "2022",
      title: "University",
      description: "Northern University of Business and Technology Khulna",
    },
  ];

  return (
    <div className="flex mt-48 flex-col bdark:bg-[#19191B] w-3/4 mx-auto items-center">
      <h2 className="text-4xl font-bold text-white my-10">Education</h2>
      <div className="relative w-full max-w-6xl mt-6">
        {/* Vertical Line */}
        <div className="absolute border-l-4 border-[#7271EB] shadow-lg h-full left-1/2 -ml-0.5 hidden sm:block"></div>

        <div className="space-y-24">
          {timelineData.map((item, idx) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
            const controls = useAnimation();

            if (inView) {
              controls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              });
            }

            return (
              <motion.div
                key={idx}
                ref={ref}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                animate={controls}
                className={`relative flex w-full ${
                  idx % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Dot on the timeline */}
                <div className="absolute w-6 h-6 circle rounded-full left-1/2 -ml-3"></div>

                {/* Timeline content */}
                <div
                  className={`button-timeline text-white px-6 py-4 shadow-md w-96 ${
                    idx % 2 === 0 ? "mr-auto" : "ml-auto"
                  }`}
                >
                  <p className="text-white font-bold">{item.year}</p>
                  <p className="text-white">{item.title}</p>
                  <p className="text-white">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
