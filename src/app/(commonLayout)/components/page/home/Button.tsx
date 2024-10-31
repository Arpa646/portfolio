import React from "react";
import { motion } from "framer-motion";
import "./styles.css";

interface ButtonProps {
  data: string;
  count: string;
}

const Button: React.FC<ButtonProps> = ({ data, count }) => {
  return (
    <motion.button
      className="mt-16 btn-design w-[300px] h-[100px] rounded-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(114, 113, 235, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span
        className="text-[#7271EB] text-4xl font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        +{count}
      </motion.span>
      <motion.span
        className="text-2xl text-white font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {data}
      </motion.span>
    </motion.button>
  );
};

export default Button;
