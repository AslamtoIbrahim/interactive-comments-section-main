import Image from "next/image";
import React from "react";
import mb from "../../../public/source/images/avatars/image-juliusomo.png";
import dt from "../../../public/source/images/avatars/image-juliusomo.webp";
import ScoreButton from "./ScoreButton";
import ReplyButton from "./ReplyButton";

interface Iimg {
  png: string;
  webp: string;
}

interface Ireply {
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: Iimg;
}
interface Icomment {
  content: string;
  createdAt: string;
  score: number;
  user: Iimg;
  replies: Ireply[];
}

type prop = {
  comment?: Icomment;
}
const Comment = ({comment}: prop) => {
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
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
          <p className="font-semibold text-dark-blue">username</p>
          <p className="text-grayish-blue">Create AT</p>
        </div>
        <p className="text-grayish-blue">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
          elit. Sed ut imperdiet lectus. Sed euismod odio vel velit aliquet, vel
          cursus velit faucibus. Proin nec velit vel velit aliquet, vel cursus
          velit faucibus.
        </p>
      </section>
      <section className="flex items-center justify-between">
        <ScoreButton />
        <ReplyButton />
      </section>
    </div>
  );
};

export default Comment;
