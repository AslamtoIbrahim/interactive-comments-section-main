"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import ReplyToComment from "./ReplyToComment";
import { Comment, CurrentUser, Voters } from "./Types";
import InstractiveContext from "../Store/CreateContext";
import EditTextView from "./EditTextView";

type voteReplies = {
  id: string;
  vote: string;
};

type commentVotes = {
  id: string;
  vote: string;
  voteReplies: voteReplies[];
};

type CommentViewProps = {
  comment: Comment;
  currentUser: CurrentUser;
};
const CommentView = ({ comment, currentUser }: CommentViewProps) => {
  const [isCommentEditVisible, setIsCommentEditVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  // const ref = useRef<HTMLTextAreaElement>(null);
  const ref = useRef(comment.content);
  const dataContext = useContext(InstractiveContext);

  const voteValue = useMemo(() => {
    return (
      comment?.voters.find((voter) => voter.username === currentUser.username)
        ?.voteType ?? ""
    );
  }, [comment?.voters]);

  useEffect(() => {
    if (isDialogVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isDialogVisible]);

  // 🖊 Edit button
  const onButtonEditClick = () => {
    setIsCommentEditVisible(!isCommentEditVisible);
  };

  // 🗑 Delete button
  const showAndHideDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const deleteComment = () => {
    // delete a comment by sending id to dispatch function
    dataContext.deleteComment(comment?.id);
    setIsDialogVisible(false);
  };

  const updateComment = () => {
    // const commentEdit = ref.current!.value;
    const commentEdit = ref.current;
    if (commentEdit === "") {
      return;
    }
    const editedComment = {
      id: comment?.id,
      content: commentEdit,
      createdAt: new Date().toISOString(),
    };
    // update a comment by sending a new comment to dispatch function
    dataContext.updateComment(editedComment);
    // ref.current!.value = "";
    ref.current = "";
    setIsCommentEditVisible(false);
  };

  const showAndHideReplyBox = () => {
    setIsReplyVisible(!isReplyVisible);
    console.log("🧼 outside: ");
  };

  // const onVoteClick = (votes: string) => {
  //   if (comment?.user.username === currentUser?.username) return;

  //   // add a new vote if there is none for this comment

  // };

  // gets score value from the button
  const onScoreClick = (score: number, votes: string) => {
    if (comment?.user.username === currentUser?.username) return;

    if (!score) return;

    console.log("score , votes 🎫 : ", score, votes);
    const voters = voteArrayHandl(votes);
    const updatedScore = {
      id: comment?.id,
      score: score,
      voters: voters,
    };
    // update the score of a comment by sending a new score to dispatch function
    dataContext.updateComment(updatedScore);
  };

  const voteArrayHandl = (vote: string): Voters[] => {
    const found = comment.voters.find(
      (voter) => voter.username === currentUser.username
    );
    if (found) {
      if (vote === "") {
        // delete code goes here
        return comment.voters.filter(
          (voter) => voter.username !== currentUser.username
        );
      } else {
        // update code goes here
        const updatedVoter = { username: currentUser.username, voteType: vote };
        return comment.voters.map((voter) =>
          voter.username === currentUser.username
            ? { ...voter, ...updatedVoter }
            : voter
        );
      }
    } else {
      // add code goes here
      const voter = { username: currentUser.username, voteType: vote };
      return [...comment.voters, voter];
    }
  };

  // get Text value from EditTextView
  const setEditTextValue = (input: string) => {
    ref.current = input;
    console.log("🎁input: ", input);
    console.log("🎀ref.current: ", ref.current);
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
              <CurrentUserView />
            )}
            <p className="text-grayish-blue text-sm md:text-lg">
              {tiemAgo(comment!.createdAt)}
            </p>
          </div>
          {!isCommentEditVisible ? (
            <p className="text-grayish-blue md:text-lg">{comment?.content}</p>
          ) : (
            <section className="flex flex-col gap-2">
              {/* <Input text={comment.content} ref={ref} /> */}
              <EditTextView
                text={comment.content}
                setTextInput={setEditTextValue}
              />
              <Button
                onClick={updateComment}
                className="self-end px-3"
                text="Update"
              />
            </section>
          )}
        </section>
        <section className="flex items-center justify-between">
          <ScoreButton
            canIvote={comment?.user.username === currentUser?.username}
            voting={voteValue}
            score={comment?.score}
            // setOnVoteListener={onVoteClick}
            setOnScoreListener={onScoreClick}
          />
          <section className="md:absolute md:top-6 md:right-10">
            {currentUser?.username == comment?.user.username ? (
              <div className="flex items-center gap-3">
                <DeleteButton onClick={showAndHideDialog} />
                <EditButton onClick={onButtonEditClick} />
              </div>
            ) : (
              <ReplyButton onClick={showAndHideReplyBox} />
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

export default CommentView;
