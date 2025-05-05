"use client";
import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import ScoreButton from "./ScoreButton";
import CurrentUserView from "./CurrentUserView";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Picture from "./Picture";
import Input from "./Input";
import Button from "./Button";
import Dialog from "./Dialog";
import ReplyButton from "./ReplyButton";
import tiemAgo from "./Functions";
import { UserContext } from "./Main";
import ReplyToReply from "./ReplyToReply";
import { Comment, CurrentUser, Reply } from "./Types";



type voteReplies = {
  id: number;
  vote: string;
};

type commentVotes = {
  id: number;
  vote: string;
  voteReplies: voteReplies[];
};

type ReplyViewProps = {
  comment?: Comment;
  reply?: Reply;
  currentUser?: CurrentUser;
};

const ReplyView = ({ comment, reply, currentUser }: ReplyViewProps) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const contextRely = useContext(UserContext);
  // const votingRef = useRef<string>("");
  const voteReplyValue = useMemo(() => {
    const localVotes = localStorage.getItem("votes");
    if (localVotes) {
      const listOfVotes: commentVotes[] = JSON.parse(localVotes);
      const foundVoteComment = listOfVotes.find((cv) => cv.id === comment?.id);
      if (foundVoteComment && Array.isArray(foundVoteComment?.voteReplies)) {
        const foundVote = foundVoteComment?.voteReplies.find(
          (rv) => rv.id === reply?.id
        );
        return foundVote?.vote || "";
      }
    }
    return "";
  }, [comment?.id, reply?.id]);

  const handleEditClik = () => {
    seteditable(!editable);
  };
  const handleDialog = () => {
    setDialog(!dialog);
  };
  const handleDelete = () => {
    // delete comment logic here
    const repl = {
      id: reply?.id,
    };

    const comRepl = {
      id: comment?.id,
      reply: repl,
    };
    contextRely?.dispatch({ type: "DELETE_REPLY", payload: comRepl });
    setDialog(false);
  };

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [dialog]);

  useEffect(() => {
    // add user replying to and the content togather
    if (ref.current) {
      ref.current!.value = `@${reply?.replyingTo}` + " " + reply?.content;
    }
  }, [editable]);

  const handleReply = () => {
    setIsReply(!isReply);
    console.log("🧼 outside: ");
  };

  const editReply = () => {
    const editinput = ref.current!.value;
    if (editinput.trim() === reply?.replyingTo.trim() || editinput === "") {
      seteditable(!editable);
      return;
    }

    console.log("🎃 username: ", reply?.user.username);
    console.log("🎃 replyingto: ", reply?.replyingTo);
    // delete @username from the content before adding it
    const text = editinput.replace(`@${reply?.replyingTo} `, "");
    const rep = {
      id: reply?.id,
      content: text,
      createdAt: new Date().toISOString(),
    };
    const editReply = {
      id: comment?.id,
      reply: rep,
    };

    contextRely?.dispatch({ type: "EDIT_REPLY", payload: editReply });
    ref.current!.value = "";
    seteditable(!editable);
  };

  const onVoteReplyClick = (vote: string) => {
    if (reply?.user.username === currentUser?.username) return;

    const localVote = localStorage.getItem("votes");
    if (localVote) {
      const newVoteForReply = {
        id: reply?.id,
        vote: vote,
      };
      const listOfVotes: commentVotes[] = JSON.parse(localVote);
      const newListOfVotes = listOfVotes.map((cv) =>
        cv.id === comment?.id
          ? {
              ...cv,
              voteReplies: cv.voteReplies.map((rv) =>
                rv.id === reply?.id ? { ...rv, ...newVoteForReply } : rv
              ),
            }
          : cv
      );
      console.log("newListOfVotes 🧡 ", newListOfVotes);
      console.log("vote::::> ", vote);
      localStorage.setItem("votes", JSON.stringify(newListOfVotes));
      console.log("localVote: ▶🚹 ", localVote);
    }
  };

  const onScoreReplyClick = (score: number) => {
    if (reply?.user.username === currentUser?.username) return;

    if (!score) return;
    const scoreReply = {
      id: reply?.id,
      score: score,
    };

    const scoreComent = {
      id: comment?.id,
      reply: scoreReply,
    };
    contextRely?.dispatch({ type: "EDIT_REPLY", payload: scoreComent });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white p-4 rounded-md font-rubik flex flex-col md:flex-row-reverse md:relative md:items-start gap-3 md:gap-4">
        <section className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Picture mb={reply?.user.image.png} dt={reply?.user.image.webp} />
            <p className="font-semibold text-sm md:text-lg text-dark-blue">
              {reply?.user.username}{" "}
            </p>
            {currentUser?.username === reply?.user.username && <CurrentUserView />}
            <p className="text-grayish-blue text-sm md:text-lg">
              {tiemAgo(reply!.createdAt)}
            </p>
          </div>

          {!editable ? (
            <p className="text-grayish-blue md:text-lg">
              <span className="text-moderate-blue font-medium">{`@${reply?.replyingTo}`}</span>{" "}
              {reply?.content}
            </p>
          ) : (
            <section className="flex flex-col gap-2">
              <Input text={reply?.content} ref={ref} />
              <Button
                className="self-end px-3"
                text="Update"
                onClick={editReply}
              />
            </section>
          )}
        </section>
        <section className="flex items-center justify-between">
          <ScoreButton
            voting={voteReplyValue}
            score={reply?.score}
            setOnVoteListener={onVoteReplyClick}
            setOnScoreListener={onScoreReplyClick}
          />
          <section className="md:absolute md:top-6 md:right-10">
            {currentUser?.username == reply?.user.username ? (
              <div className="flex items-center gap-3">
                <DeleteButton onClick={handleDialog} />
                <EditButton onClick={handleEditClik} />
              </div>
            ) : (
              <ReplyButton onClick={handleReply} />
            )}
          </section>
        </section>
        {dialog && (
          <Dialog cancelClick={handleDialog} deleteClick={handleDelete} />
        )}
      </div>
      {isReply && (
        <ReplyToReply
          comment={comment!}
          currentUser={currentUser}
          reply={reply!}
          closeReplyBox={handleReply}
        />
      )}
    </div>
  );
};

export default ReplyView;
