import React from "react";

interface ButtonProps {
  data: string;
  count: string;
}

const Button: React.FC<ButtonProps> = ({ data, count }) => {
  return (
    <button className="mt-16 btn-design w-[300px] h-[80px] rounded-full">
      <span className="text-[#7271EB] text-4xl font-semibold">+{count}</span>
      <span className="ml-4 text-2xl text-white font-medium">{data}</span>
    </button>
  );
};

export default Button;
