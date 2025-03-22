"use client";
import React, { useState } from "react";
import ScoreButton from "./ScoreButton";
import CurrentUser from "./CurrentUser";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Picture from "./Picture";
import Input from "./Input";
import Button from "./Button";
import Dialog from "../Dialog/Dialog";

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
};
const Comment = ({ comment }: prop) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
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
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col md:flex-row-reverse md:relative md:items-start gap-3 md:gap-4">
      <section className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Picture />
          <p className="font-semibold md:text-lg text-dark-blue">username</p>
          <CurrentUser />
          <p className="text-grayish-blue md:text-lg">Create AT</p>
        </div>
        {!editable ? (
          <p className="text-grayish-blue md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            neque elit. Sed ut imperdiet lectus. Sed euismod odio vel velit
            aliquet, vel cursus velit faucibus. Proin nec velit vel velit
            aliquet, vel cursus velit faucibus.
          </p>
        ) : (
          <section className="flex flex-col gap-2">
            <Input text="hello" />
            <Button className="self-end px-3" text="Update" />
          </section>
        )}
      </section>
      <section className="flex items-center justify-between">
        <ScoreButton />
        <section className="md:absolute md:top-6 md:right-10">
          {/* <ReplyButton /> */}
          <div className="flex items-center gap-3">
            <DeleteButton onlcik={handleDialog} />
            <EditButton onlcik={handleEditClik} />
          </div>
        </section>
      </section>
      {dialog && <Dialog cancelClick={handleDialog} deleteClick={handleDelete}/>}
    </div>
  );
};

export default Comment;
