import React, { useContext, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Picture from "./Picture";
import { UserContext } from "./Main";

interface IcurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

type prop = {
  currentUser?: IcurrentUser;
};

type reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

const Response = ({ currentUser }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const context = useContext(UserContext);

  // add comment to data
  const sendClick = () => {
    const comment = ref.current!.value;
    console.log("🌵 send: ", comment);
    if (comment === "") {
      return;
    }

    const nexId = Math.max(0, ...context!.comments.map((c) => c.id)) + 1;
    
    const newComment = {
      id: nexId,
      content: comment,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        image: {
          png: currentUser?.image.png,
          webp: currentUser?.image.webp,
        },
        username: currentUser?.username,
      },
      replies: [] as reply[],
    };
    context?.dispatch({ type: "ADD_COMMENT", payload: newComment });
  };

  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button clcik={sendClick} />
      </section>
    </div>
  );
};

export default Response;
