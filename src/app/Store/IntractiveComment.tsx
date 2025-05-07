"use client";
import React, { useReducer } from "react";
import InstractiveContext from "./CreateContext";
import {
  Comment,
  Action,
  UpdatedComment,
  UpdatedReply,
  LOCAL_COMMENT_KEY,
} from "../components/Types";

const defaultCommentsState: Comment[] = [];

const saveToLoacal = (data: Comment[]) => {
  localStorage.setItem(LOCAL_COMMENT_KEY, JSON.stringify(data));
};

const commentReducer = (comments: Comment[], action: Action): Comment[] => {
  console.log("commentReducer 🏛", comments);
  switch (action.type) {
    case "SET_COMMENTS":
      return action.payload;
    case "ADD_COMMENT": {
      const newComment = [...comments, action.payload];
      saveToLoacal(newComment);
      return newComment;
    }
    case "EDIT_COMMENT": {
      const editedCom = comments.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, ...action.payload }
          : comment
      );
      saveToLoacal(editedCom);

      return editedCom;
    }
    case "EDIT_REPLY": {
      const editedReply = comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === action.payload.reply.id
                ? { ...reply, ...action.payload.reply }
                : reply
            ),
          };
        }
        return comment;
      });
      saveToLoacal(editedReply);
      return editedReply;
    }
    case "DELETE_COMMENT": {
      const deletedComment = comments.filter(
        (comment) => comment.id !== action.payload.id
      );
      saveToLoacal(deletedComment);
      return deletedComment;
    }
    case "DELETE_REPLY": {
      const deletedReply = comments.map((comment) =>
        comment.id === action.payload.id
          ? {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== action.payload.nestedId
              ),
            }
          : comment
      );
      saveToLoacal(deletedReply);
      return deletedReply;
    }
    default:
      return comments;
  }
};

const IntractiveComment = (props: { children: React.ReactNode }) => {
  const [commentsState, dispatchComment] = useReducer(
    commentReducer,
    defaultCommentsState
  );

  const addAllCommentsHandler = (comments: Comment[]) => {
    console.log("comments: 🏫", comments);
    dispatchComment({ type: "SET_COMMENTS", payload: comments });
  };
  const addCommentHandler = (comment: Comment) => {
    dispatchComment({ type: "ADD_COMMENT", payload: comment });
  };
  const updateCommentHandler = (comment: UpdatedComment) => {
    dispatchComment({ type: "EDIT_COMMENT", payload: comment });
  };
  const updateReplyHandler = (id: string, reply: UpdatedReply) => {
    dispatchComment({ type: "EDIT_REPLY", payload: { id, reply } });
  };
  const deleteCommentHandler = (id: string) => {
    dispatchComment({ type: "DELETE_COMMENT", payload: { id } });
  };
  const deleteReplyHandler = (id: string, nestedId: string) => {
    dispatchComment({ type: "DELETE_REPLY", payload: { id, nestedId } });
  };
  const data = {
    comments: commentsState,
    addAllComments: addAllCommentsHandler,
    addComment: addCommentHandler,
    updateComment: updateCommentHandler,
    updateReply: updateReplyHandler,
    deleteComment: deleteCommentHandler,
    deleteReply: deleteReplyHandler,
  };

  return (
    <InstractiveContext.Provider value={data}>
      {props.children}
    </InstractiveContext.Provider>
  );
};

export default IntractiveComment;
