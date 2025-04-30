"use client";
import React, { useContext, useRef, useState } from "react";
import ScoreButton from "./ScoreButton";
import CurrentUser from "./CurrentUser";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Picture from "./Picture";
import Input from "./Input";
import Button from "./Button";
import Dialog from "./Dialog";
import ReplyButton from "./ReplyButton";
import { UserContext } from "./Main";
import tiemAgo from './Functions'

interface Ireply {
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    png: string;
    webp: string;
  };
}
interface Icomment {
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

type prop = {
  comment?: Icomment;
  currentUserName?: string;
  index?: number;
};
const Comment = ({ comment, currentUserName, index }: prop) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const commentContext = useContext(UserContext);

  console.log("😍", comment?.user.image.png);

  const handleEditClik = () => {
    seteditable(!editable);
  };
  const handleDialog = () => {
    setDialog(!dialog);
  };
  const handleDelete = () => {
    // delete comment logic here
    localStorage.clear();
    setDialog(false);
  };

  const onUpdate = () => {
    const commentEdit = ref.current!.value;
    if (commentEdit === "") {
      return;
    }
  };



  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col md:flex-row-reverse md:relative md:items-start gap-3 md:gap-4">
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Picture mb={comment?.user.image.png} dt={comment?.user.image.webp} />
          <p className="font-semibold text-sm md:text-lg text-dark-blue">
            {comment?.user.username}
          </p>
          {currentUserName === comment?.user.username && <CurrentUser />}
          <p className="text-grayish-blue text-sm md:text-lg">
            {tiemAgo(comment!.createdAt)}
          </p>
        </div>
        {/* <span>
          {comment?.replies?.[index || 0]?.replyingTo
            ? `@${comment.replies[index || 0].replyingTo}`
            : ""}
        </span> */}

        {!editable ? (
          <p className="text-grayish-blue md:text-lg">{comment?.content}</p>
        ) : (
          <section className="flex flex-col gap-2">
            <Input text={comment?.content} ref={ref} />
            <Button clcik={onUpdate} className="self-end px-3" text="Update" />
          </section>
        )}
      </section>
      <section className="flex items-center justify-between">
        <ScoreButton score={comment?.score} />
        <section className="md:absolute md:top-6 md:right-10">
          {currentUserName == comment?.user.username ? (
            <div className="flex items-center gap-3">
              <DeleteButton onlcik={handleDialog} />
              <EditButton onlcik={handleEditClik} />
            </div>
          ) : (
            <ReplyButton />
          )}
        </section>
      </section>
      {dialog && (
        <Dialog cancelClick={handleDialog} deleteClick={handleDelete} />
      )}
    </div>
  );
};

export default Comment;
