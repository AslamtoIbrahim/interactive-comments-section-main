import Images from "next/image";
import React from "react";

type Images = {
  mb?: string;
  dt?: string;
};
const Picture = ({ mb, dt }: Images) => {
  return (
    <picture>
      <source srcSet={dt} type="image/webp" media="(min-width: 768px)" />
      {mb && (
        <Images
          className="h-auto md:w-10 lg:w-16"
          src={mb}
          alt="Profile Picture"
          width={30}
          height={30}
          quality={100}
        />
      )}
    </picture>
  );
};

export default Picture;
