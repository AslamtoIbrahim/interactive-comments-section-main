import Image from "next/image";
import React from "react";
import repIcon from "../../../public/source/images/icon-reply.svg";

interface ButtonProp {
  onClick?: () => void;
}
const ReplyButton = ({ onClick }: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-sm md:text-base font-rubik text-moderate-blue font-medium flex items-center gap-1
    hover:opacity-40"
    >
      <Image src={repIcon} alt="reply" />
      <span>Reply</span>
    </button>
  );
};

export default ReplyButton;
