import Image from "next/image";
import React from "react";
import repIcon from "../../../public/source/images/icon-edit.svg";

interface ButtonProps {
  onClick: () => void;
}
const EditButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-sm md:text-base  font-rubik text-moderate-blue font-medium flex items-center gap-1
    hover:opacity-40"
    >
      <Image src={repIcon} alt="edit button" />
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
