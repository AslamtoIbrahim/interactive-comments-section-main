import Image from "next/image";
import React from "react";
import repIcon from "../../../public/source/images/icon-delete.svg";

type prop = {
  onlcik?: () => void;
};
const DeleteButton = ({ onlcik }: prop) => {
  return (
    <button
      onClick={onlcik}
      className="cursor-pointer text-sm md:text-base font-rubik text-soft-red font-medium flex items-center gap-1
      hover:opacity-40"
    >
      <Image src={repIcon} alt="reply" />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
