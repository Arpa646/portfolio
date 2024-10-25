"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const Photo: React.FC = () => {
  return (
    <div className="w-full flex justify-center relative rounded-full border-4 border-gray-300 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 relative">
          <Image
            src="https://649d13dbb8cc852f29b5e9c5--spectacular-seahorse-ed8247.netlify.app/assets/banner-a8ed86ae.jpg"
            alt="Luke Coleman's Photo"
            className="object-cover w-full h-full rounded-full"
            width={500} // Set the manual width here
            height={500} // Set the manual height here
            priority={true} // Fixed value (not as string)
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
