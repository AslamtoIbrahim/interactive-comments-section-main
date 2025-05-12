import React, { useContext, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Picture from "./Picture";
import { CurrentUser } from "../../utils/Types";
import InstractiveContext from "../Store/CreateContext";

type ResponseProps = {
  currentUser: CurrentUser;
};


const Response = ({ currentUser }: ResponseProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const dataContext = useContext(InstractiveContext);

  // add comment to data
  const sendClick = () => {
    const comment = ref.current?.value;
    console.log("🌵 send: ", comment);
    if (comment === "") {
      return;
    }

    // get the last id and add to it one so it add new id
    const nexId = crypto.randomUUID();

    const newComment = {
      id: nexId,
      content: comment!,
      createdAt: new Date().toISOString(),
      score: 0,
      voters: [],
      user: {
        image: {
          png: currentUser?.image.png,
          webp: currentUser?.image.webp,
        },
        username: currentUser?.username,
      },
      replies: [],
    };

    // add a new comment by sending it dispatch function
    dataContext.addComment(newComment);

    // clear the textarea after adding a comment
    ref.current!.value = "";
    console.log("🧼 ref: ", ref.current?.value);

  };


  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button onClick={sendClick} />
      </section>
    </div>
  );
};

export default Response;
