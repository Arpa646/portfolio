import React from "react";
import { motion } from "framer-motion";
import { useGetAllSkillQuery } from "@/GlobalRedux/api/api";

// Button component to display each skill icon with animation
const PartnerButton = ({ imgSrc }: { imgSrc: string }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.1 }}
  >
    <img
      src={imgSrc}
      alt="Skill Icon"
      className="w-11 sm:w-24 lg:w-32 h-auto"
    />
  </motion.div>
);

const Skill = () => {
  const { data: skills, isLoading } = useGetAllSkillQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="pt-20 h-auto bg-black dark:bg-[#19191B]">
      <div className="text-white py-12 px-4 md:px-8">
        {/* Testimonial Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Circular Text with Icon */}
          <motion.div
            className="relative w-full md:w-1/2 h-24 flex items-center justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute w-full h-full flex justify-center items-center">
              <div>
                <h1 className="m-4 text-2xl sm:text-3xl">Skill</h1>
                <img
                  className="w-20 sm:w-32 lg:w-40"
                  src="https://hubfolio.themescamp.com/inner-pages/wp-content/uploads/sites/10/2024/08/vector_quote.svg"
                  alt="Quote Icon"
                />
              </div>
            </div>
          </motion.div>

          {/* Testimonial Text */}
          <motion.blockquote
            className="text-center max-w-2xl text-lg font-medium"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-1xl sm:text-3xl lg:text-4xl font-bold text-start">
              In the ever-evolving landscape of web development, finding a partner who can seamlessly blend creativity with technical expertise is crucial. As a dedicated web developer, I specialize in creating engaging, user-friendly websites and applications that not only meet but exceed client expectations.
            </p>
          </motion.blockquote>
        </div>
      </div>

      {/* Skills (Partner Logos) */}
      <div className="flex justify-center mt-12 lg:mt-32">
        <motion.div
          className="flex flex-wrap justify-center gap-4 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {skills?.map((skill: { _id: string; iconUrl: string }) => (
            <PartnerButton key={skill._id} imgSrc={skill.iconUrl} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;
