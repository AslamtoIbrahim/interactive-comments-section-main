import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "./Main";
import Input from "./Input";
import Picture from "./Picture";
import Button from "./Button";

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
  comment: Icomment;
  currentUser?: IcurrentUser;
  closeReplyBox: () => void;
};

const ReplyToComment = ({ currentUser, comment, closeReplyBox }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const context = useContext(UserContext);

  const atusername = `@${comment.user.username} `;

  useEffect(() => {
    //  add @ and username of the replyingTo in textarea
    ref.current!.value = atusername;
  }, []);

  const setReply = () => {
    const replyText = ref.current!.value;

    if (replyText.trim() === atusername.trim() || replyText.trim() === "") {
      closeReplyBox();
      return;
    }

    // get new id for new reply
    const nexId = Math.max(0, ...comment.replies.map(re => re.id)) + 1;
    const newReply = {
        id: nexId,
        content: replyText.replace(atusername, ''),
        createdAt: new Date().toISOString(),
        score: 0,
        replyingTo: comment.user.username,
        user: {
          image: {
            png: currentUser?.image.png as string,
            webp: currentUser?.image.webp as string,
          },
          username: currentUser?.username as string,
        }
      }

    const updatedComment = {
        id: comment.id,
        replies: [...comment.replies, newReply],
    }
    context?.dispatch({type:'EDIT_COMMENT', payload: updatedComment})
    ref.current!.value = ''
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

export default ReplyToComment;
