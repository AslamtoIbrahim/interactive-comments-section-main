import Image from "next/image";
import React from "react";
import mbx from "../../../public/source/images/avatars/image-juliusomo.png";

type prop = {
    mb?: string;
    dt?: string;
}
const Picture = ({mb, dt}:prop) => {
  return (
    <picture>
  
    <source
      srcSet={dt}
      type="image/webp"
      media="(min-width: 768px)"
    />
    <Image
      className="h-auto md:w-10 lg:w-16"
      src={mb || mbx}
      alt="Profile Picture"
      width={30}
      height={30}
      priority
      quality={100}
    />
  </picture>
  )
}

export default Picture
