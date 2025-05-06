import React, { useContext, useEffect, useRef } from "react";
import Input from "./Input";
import Picture from "./Picture";
import Button from "./Button";
import { Comment, CurrentUser, Reply } from "./Types";
import InstractiveContext from "../Store/CreateContext";

type ReplyToReplyProps = {
  currentUser?: CurrentUser;
  comment: Comment;
  reply: Reply;
  closeReplyBox: () => void;
};
const ReplyToReply = ({
  currentUser,
  comment,
  reply,
  closeReplyBox,
}: ReplyToReplyProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dataContext = useContext(InstractiveContext);

  let usernameToReply: string;
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
    const newId = crypto.randomUUID();
    // remove the usernameToReply from the text before adding it
    const text = replyText.replace(usernameToReply, "");
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
    // context?.dispatch({ type: "EDIT_COMMENT", payload: updatedComment });
    // add a new reply to exsited reply by sending it to dispatch
    dataContext.updateComment(updatedComment);
    ref.current!.value = "";
    closeReplyBox();
  };
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button onClick={setReply} text="Reply" />
      </section>
    </div>
  );
};

export default ReplyToReply;
