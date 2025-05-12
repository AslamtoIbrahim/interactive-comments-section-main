import Image from "next/image";
import React from "react";

type ImageProps = {
  mb: string;
  dt: string;
};
const Picture = ({ mb, dt }: ImageProps) => {
  console.log("mb", mb);
  return (
    <picture>
      <source srcSet={dt} type="image/webp" media="(min-width: 768px)" />
      <img
        className="h-auto"
        src={mb}
        alt="Profile Picture"
        width={30}
        height={30}
      />
    </picture>
  );
};

export default Picture;
