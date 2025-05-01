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
import tiemAgo from "./Functions";
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
  comment?: Icomment;
  reply?: Ireply;
  currentUser?: IcurrentUser;
  index?: number;
};

const Reply = ({ comment, reply, currentUser, index }: prop) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const contextRely = useContext(UserContext);

  const handleEditClik = () => {
    seteditable(!editable);
  };
  const handleDialog = () => {
    setDialog(!dialog);
  };
  const handleDelete = () => {
    // delete comment logic here
    setDialog(false);
  };

  const editReply = () => {
    const editinput = ref.current!.value;
    if (editinput.trim() === reply?.user.username.trim() || editinput === "") {
      seteditable(!editable);
      return;
    }

    const rep = {
      id: reply?.id,
      content: editinput,
      createdAt: new Date().toISOString(),
    }
    const editReply = {
      id: comment?.id,
      reply: rep,
    };

    contextRely?.dispatch({ type: "EDIT_REPLY", payload: editReply });
    ref.current!.value = ''
    seteditable(!editable);

  };

  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col md:flex-row-reverse md:relative md:items-start gap-3 md:gap-4">
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Picture mb={reply?.user.image.png} dt={reply?.user.image.webp} />
          <p className="font-semibold text-sm md:text-lg text-dark-blue">
            {reply?.user.username}{" "}
          </p>
          {currentUser?.username === reply?.user.username && <CurrentUser />}
          <p className="text-grayish-blue text-sm md:text-lg">
            {tiemAgo(reply!.createdAt)}
          </p>
        </div>
        {/* <span>
          {reply?.replies?.[index || 0]?.replyingTo
            ? `@${reply.replies[index || 0].replyingTo}`
            : ""}
        </span> */}

        {!editable ? (
          <p className="text-grayish-blue md:text-lg">{reply?.content}</p>
        ) : (
          <section className="flex flex-col gap-2">
            <Input text={reply?.content} ref={ref} />
            <Button className="self-end px-3" text="Update" clcik={editReply} />
          </section>
        )}
      </section>
      <section className="flex items-center justify-between">
        <ScoreButton score={reply?.score} />
        <section className="md:absolute md:top-6 md:right-10">
          {currentUser?.username == reply?.user.username ? (
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

export default Reply;
