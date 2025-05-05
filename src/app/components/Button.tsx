import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
};
const Button = ({ className, onClick, text = "Send" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "bg-moderate-blue  text-white font-rubik uppercase py-2 px-6 rounded-lg cursor-pointer hover:bg-moderate-blue/40",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
