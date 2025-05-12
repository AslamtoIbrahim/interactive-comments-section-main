import Image from "next/image";
import React from "react";

type ImageProps = {
  mb: string;
  dt: string;
};
const Picture = ({ mb, dt }: ImageProps) => {
  console.log('mb', mb);
  return (
    <picture>
      <source srcSet={mb} type="image/webp" media="(min-width: 768px)" />
       <Image
          className="h-auto"
          src={dt}
          alt="Profile Picture"
          width={35}
          height={35}
          quality={100}
        />
    </picture>
  );
};

export default Picture;
