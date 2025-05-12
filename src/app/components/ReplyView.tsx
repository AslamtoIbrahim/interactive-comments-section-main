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
import getTimeAgo from "../../utils/helpers";
import ReplyToReply from "./ReplyToReply";
import { Comment, CurrentUser, Reply, Voters } from "../../utils/Types";
import InstractiveContext from "../Store/CreateContext";

type ReplyViewProps = {
  comment: Comment;
  reply: Reply;
  currentUser: CurrentUser;
};

const ReplyView = ({ comment, reply, currentUser }: ReplyViewProps) => {
  const [editable, seteditable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const dataContext = useContext(InstractiveContext);

  const voteReplyValue = useMemo(() => {
    return (
      reply.voters.find((voter) => voter.username === currentUser?.username)
        ?.voteType ?? ""
    );
  }, [reply.voters, currentUser.username]);

  const handleEditClik = () => {
    seteditable(!editable);
  };
  const displayDeleteDialog = () => {
    setDialog(!dialog);
  };
  const deleteReplyClick = () => {
    // delete comment logic here
    setDialog(!dialog);
    document.body.style.overflow = "visible";

    //  delete a reply by sending it to dispatch function
    dataContext.deleteReply(comment?.id, reply?.id);
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
  }, [editable, reply.replyingTo, reply.content]);

  const handleReply = () => {
    setIsReply(!isReply);
  };

  const editReply = () => {
    const editinput = ref.current!.value;
    if (editinput.trim() === reply?.replyingTo.trim() || editinput === "") {
      seteditable(!editable);
      return;
    }

    // delete @username from the content before adding it
    const text = editinput.replace(`@${reply?.replyingTo} `, "");
    const editedReply = {
      id: reply?.id,
      content: text,
      edited: "edited",
    };

    //  update the reply by sending it to dispatch function
    dataContext.updateReply(comment?.id, editedReply);
    ref.current!.value = "";
    seteditable(!editable);
  };

  const onScoreReplyClick = (score: number, vote: string) => {
    // if (reply?.user.username === currentUser?.username) return;

    if (!score) return;

    const updatedVoter = voteArrayHandl(vote);
    const scoreReply = {
      id: reply?.id,
      score: score,
      voters: updatedVoter,
    };

    // update score of the reply by sending it to dispatch
    dataContext.updateReply(comment?.id, scoreReply);
  };

  const voteArrayHandl = (vote: string): Voters[] => {
    const found = reply.voters.find(
      (voter) => voter.username === currentUser.username
    );
    if (found) {
      if (vote === "") {
        // delete code goes here
        return reply.voters.filter(
          (voter) => voter.username !== currentUser.username
        );
      } else {
        // update code goes here
        const updatedVoter = { username: currentUser.username, voteType: vote };
        return reply.voters.map((voter) =>
          voter.username === currentUser.username
            ? { ...voter, ...updatedVoter }
            : voter
        );
      }
    } else {
      // add code goes here
      const voter = { username: currentUser.username, voteType: vote };
      return [...reply.voters, voter];
    }
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
            {currentUser?.username === reply?.user.username && (
              <CurrentUserView />
            )}
            <p className="text-grayish-blue text-[12px] md:text-lg ">
              {getTimeAgo(reply!.createdAt)}
              {reply.edited && <span> ({reply.edited})</span>}
            </p>
          </div>

          {!editable ? (
            <p className="text-grayish-blue md:text-lg">
              <span className="text-moderate-blue font-medium">{`@${reply?.replyingTo}`}</span>{" "}
              {reply?.content}
            </p>
          ) : (
            <section className="flex flex-col gap-2">
              <Input ref={ref} />
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
            setOnScoreListener={onScoreReplyClick}
          />
          <section className="md:absolute md:top-6 md:right-10">
            {currentUser?.username == reply?.user.username ? (
              <div className="flex items-center gap-3">
                <DeleteButton onClick={displayDeleteDialog} />
                <EditButton onClick={handleEditClik} />
              </div>
            ) : (
              <ReplyButton onClick={handleReply} />
            )}
          </section>
        </section>
        {dialog && (
          <Dialog
            cancelClick={displayDeleteDialog}
            deleteClick={deleteReplyClick}
          />
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
