"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import tiemAgo from "./Functions";
import ReplyToComment from "./ReplyToComment";

interface IcurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
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

type prop = {
  comment?: Icomment;
  currentUser?: IcurrentUser;
};
const Comment = ({ comment, currentUser }: prop) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const commentContext = useContext(UserContext);

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [dialog]);

  const handleEditClik = () => {
    seteditable(!editable);
  };
  const handleDialog = () => {
    setDialog(!dialog);
  };
  const handleDelete = () => {
    const deleteComment = { id: comment?.id };
    commentContext?.dispatch({
      type: "DELETE_COMMENT",
      payload: deleteComment,
    });

    setDialog(false);
  };

  const onUpdate = () => {
    const commentEdit = ref.current!.value;
    if (commentEdit === "") {
      return;
    }
    const editedComment = {
      id: comment?.id,
      content: commentEdit,
      createdAt: new Date().toISOString(),
    };

    commentContext?.dispatch({ type: "EDIT_COMMENT", payload: editedComment });
    ref.current!.value = "";
    seteditable(false);
  };

  const handleReply = () => {
    setIsReply(!isReply);
    console.log("🧼 outside: ");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white p-4 rounded-md font-rubik flex flex-col md:flex-row-reverse md:relative md:items-start gap-3 md:gap-4">
        <section className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Picture
              mb={comment?.user.image.png}
              dt={comment?.user.image.webp}
            />
            <p className="font-semibold text-sm md:text-lg text-dark-blue">
              {comment?.user.username}
            </p>
            {currentUser?.username === comment?.user.username && (
              <CurrentUser />
            )}
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
              <Button
                clcik={onUpdate}
                className="self-end px-3"
                text="Update"
              />
            </section>
          )}
        </section>
        <section className="flex items-center justify-between">
          <ScoreButton score={comment?.score} />
          <section className="md:absolute md:top-6 md:right-10">
            {currentUser?.username == comment?.user.username ? (
              <div className="flex items-center gap-3">
                <DeleteButton onlcik={handleDialog} />
                <EditButton onlcik={handleEditClik} />
              </div>
            ) : (
              <ReplyButton onlcik={handleReply} />
            )}
          </section>
        </section>
        {dialog && (
          <Dialog cancelClick={handleDialog} deleteClick={handleDelete} />
        )}
      </div>
      {isReply && (
        <ReplyToComment
          comment={comment!}
          currentUser={currentUser}
          closeReplyBox={handleReply}
        />
      )}
    </div>
  );
};

export default Comment;
