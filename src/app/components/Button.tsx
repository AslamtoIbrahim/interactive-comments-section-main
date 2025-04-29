import React from "react";
import { twMerge } from "tailwind-merge";

type prop = {
  className?: string;
  clcik?: () => void;
  text?: string;
};
const Button = ({ className, clcik, text = "Send" }: prop) => {
  return (
    <button
      onClick={clcik}
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
