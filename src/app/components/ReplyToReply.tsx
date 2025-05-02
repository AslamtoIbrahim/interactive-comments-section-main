import React, { useContext, useEffect, useRef } from "react";
import Input from "./Input";
import Picture from "./Picture";
import Button from "./Button";
import { UserContext } from "./Main";

interface IcurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Icomment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Ireply[];
}

interface Ireply {
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
}

type prop = {
  currentUser?: IcurrentUser;
  comment: Icomment;
  reply: Ireply;
  closeReplyBox: () => void;
};
const ReplyToReply = ({ currentUser, comment, reply, closeReplyBox }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  let usernameToReply: string;
  const context = useContext(UserContext);
  useEffect(() => {
    // add @ sign to the user we are replying to and set it textarea
    usernameToReply = `@${reply.user.username} `;
    ref.current!.value = usernameToReply;
  }, []);


  

  const setReply = () => {
    const replyText = ref.current!.value;

    if (
      replyText.trim() === usernameToReply.trim() ||
      replyText.trim() === ""
    ) {
      closeReplyBox();
      return;
    }
    // generate a new id for this new reply to the reply
    const newId = Math.max(0, ...comment.replies.map((c) => c.id)) + 1;
    // remove the usernameToReply from the text before adding it
    const text = replyText.replace(usernameToReply, '');
    const newReply = {
      id: newId,
      content: text,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: reply.user.username,
      user: {
        image: {
          png: currentUser?.image.png as string,
          webp: currentUser?.image.webp as string,
        },
        username: currentUser?.username as string,
      },
    };
    const updatedComment = {
      id: comment.id,
      replies: [...comment.replies, newReply],
    };
    context?.dispatch({ type: "EDIT_COMMENT", payload: updatedComment });
    ref.current!.value = "";
    closeReplyBox();
  };
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button clcik={setReply} text="Reply" />
      </section>
    </div>
  );
};

export default ReplyToReply;
