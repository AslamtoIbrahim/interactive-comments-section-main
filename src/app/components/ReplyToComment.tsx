import React, { useContext, useEffect, useRef } from "react";
import Input from "./Input";
import Picture from "./Picture";
import Button from "./Button";
import { CurrentUser, Comment } from "./Types";
import InstractiveContext from "../Store/CreateContext";

type voteReplies = {
  id: string;
  vote: string;
};

type commentVotes = {
  id: string;
  vote: string;
  voteReplies: voteReplies[];
};

type RplyBoxProps = {
  comment: Comment;
  currentUser?: CurrentUser;
  closeReplyBox: () => void;
};

const ReplyToComment = ({
  currentUser,
  comment,
  closeReplyBox,
}: RplyBoxProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const dataContext = useContext(InstractiveContext);

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
    const newId = crypto.randomUUID();
    const newReply = {
      id: newId,
      content: replyText.replace(atusername, ""),
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: comment.user.username,
      user: {
        image: {
          png: currentUser?.image.png as string,
          webp: currentUser?.image.webp as string,
        },
        username: currentUser?.username as string,
      },
    };

    const existedComment = {
      id: comment.id,
      replies: [...comment.replies, newReply],
    };
    // send a comment with new edited reply to dispatch function
    dataContext.updateComment(existedComment);

    ref.current!.value = "";
    closeReplyBox();
    // add a new vote for this new reply in the camment
    addNewVote(newId);
  };

  const addNewVote = (id: string) => {
    const localVotes = localStorage.getItem("votes");
    if (localVotes) {
      const listVotes: commentVotes[] = JSON.parse(localVotes);
      const replyVote = {
        id: id,
        vote: "",
      };
      const newObjectVote = {
        id: comment.id,
        voteReplies: replyVote,
      };
      const newListVote = listVotes.map((cv) =>
        cv.id === comment.id ? { ...cv, ...newObjectVote } : cv
      );
      localStorage.setItem("votes", JSON.stringify(newListVote));
    }
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

export default ReplyToComment;
