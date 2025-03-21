import Image from "next/image";
import React from "react";
import mb from "../../../public/source/images/avatars/image-juliusomo.png";
import dt from "../../../public/source/images/avatars/image-juliusomo.webp";
import Input from "./Input";
import SendButton from "./SendButton";

const Response = () => {
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input />
      <section className="flex items-center justify-between">
        <picture>
          <source
            width={64}
            height={64}
            srcSet={dt.src}
            type="image/webp"
            media="(min-width: 768px)"
          />
          <Image
            src={mb}
            alt="Profile Picture"
            width={30}
            height={30}
            priority
            quality={100}
          />
        </picture>
        <SendButton />
      </section>
    </div>
  );
};

export default Response;
