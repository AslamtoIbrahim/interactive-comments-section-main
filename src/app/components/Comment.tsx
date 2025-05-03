"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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

type voteReplies = {
  id: number;
  vote: string;
};

type commentVotes = {
  id: number;
  vote: string;
  voteReplies: voteReplies[];
};

type prop = {
  comment?: Icomment;
  currentUser?: IcurrentUser;
};
const Comment = ({ comment, currentUser }: prop) => {
  const [isCommentEditVisible, setIsCommentEditVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const commentContext = useContext(UserContext);
  const voteValue = useMemo(() => {
    const votes = localStorage.getItem("votes");
    if (votes) {
      const listvotes: commentVotes[] = JSON.parse(votes);
      return listvotes.find((vo) => vo.id === comment?.id)?.vote ?? "";
    }
    return "";
  }, [comment?.id]);

  useEffect(() => {
    if (isDialogVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isDialogVisible]);

  const onButtonEditClick = () => {
    setIsCommentEditVisible(!isCommentEditVisible);
  };
  const showAndHideDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };
  const deleteComment = () => {
    const targetComment = { id: comment?.id };
    commentContext?.dispatch({
      type: "DELETE_COMMENT",
      payload: targetComment,
    });

    setIsDialogVisible(false);
  };

  const updateComment = () => {
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
    setIsCommentEditVisible(false);
  };

  const showAndHideReplyBox = () => {
    setIsReplyVisible(!isReplyVisible);
    console.log("🧼 outside: ");
  };

  const onVoteClick = (votes: string) => {
    if (comment?.user.username === currentUser?.username) return;

    // localStorage.removeItem("votes");
    console.log("votes 🎫 : ", votes);

    // add a new vote if there is none for this comment
    const localVotes = localStorage.getItem("votes");
    if (localVotes) {
      const newVote = {
        id: comment?.id,
        vote: votes,
      };
      const list: commentVotes[] = JSON.parse(localVotes);
      const newVoteList = list.map((vo) =>
        vo.id === comment?.id ? { ...vo, ...newVote } : vo
      );
      localStorage.setItem("votes", JSON.stringify(newVoteList));
    }

    console.log("localStorage Votes :🎑:  ", localStorage.getItem("votes"));
  };

  const onScoreClick = (score: number) => {
    if (comment?.user.username === currentUser?.username) return;

    if (!score) return;
    const updatedScore = {
      id: comment?.id,
      score: score,
    };
    commentContext?.dispatch({ type: "EDIT_COMMENT", payload: updatedScore });
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
          {!isCommentEditVisible ? (
            <p className="text-grayish-blue md:text-lg">{comment?.content}</p>
          ) : (
            <section className="flex flex-col gap-2">
              <Input text={comment?.content} ref={ref} />
              <Button
                clcik={updateComment}
                className="self-end px-3"
                text="Update"
              />
            </section>
          )}
        </section>
        <section className="flex items-center justify-between">
          <ScoreButton
            voting={voteValue}
            score={comment?.score}
            setOnVoteListener={onVoteClick}
            setOnScoreListener={onScoreClick}
          />
          <section className="md:absolute md:top-6 md:right-10">
            {currentUser?.username == comment?.user.username ? (
              <div className="flex items-center gap-3">
                <DeleteButton onlcik={showAndHideDialog} />
                <EditButton onlcik={onButtonEditClick} />
              </div>
            ) : (
              <ReplyButton onlcik={showAndHideReplyBox} />
            )}
          </section>
        </section>
        {isDialogVisible && (
          <Dialog cancelClick={showAndHideDialog} deleteClick={deleteComment} />
        )}
      </div>
      {isReplyVisible && (
        <ReplyToComment
          comment={comment!}
          currentUser={currentUser}
          closeReplyBox={showAndHideReplyBox}
        />
      )}
    </div>
  );
};

export default Comment;
