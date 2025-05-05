"use client";
import React, { useEffect, useReducer, useState, createContext } from "react";
import CommentReply from "./CommentReply";
import Response from "./Response";
import { CurrentUser, Comment, ContextType, Action } from "./Types";





export const UserContext = createContext<ContextType | null>(null);

const Main = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  const reducer = (comments: Comment[], action: Action): Comment[] => {
    switch (action.type) {
      case "SET_COMMENTS":
        return action.payload;
      case "ADD_COMMENT": {
        const newComment = [...comments, action.payload];
        localStorage.setItem("comment", JSON.stringify(newComment));
        return newComment;
      }
      case "EDIT_COMMENT": {
        const editedCom = comments.map((com) =>
          com.id === action.payload.id ? { ...com, ...action.payload } : com
        );
        localStorage.setItem("comment", JSON.stringify(editedCom));
        return editedCom;
      }
      case "EDIT_REPLY": {
        const editedReply = comments.map((com) => {
          if (com.id === action.payload.id) {
            return {
              ...com,
              replies: com.replies.map((rep) =>
                rep.id === action.payload.reply.id
                  ? { ...rep, ...action.payload.reply }
                  : rep
              ),
            };
          }
          return com;
        });
        localStorage.setItem("comment", JSON.stringify(editedReply));
        return editedReply;
      }
      case "DELETE_COMMENT": {
        const deletedCom = comments.filter(
          (com) => com.id !== action.payload.id
        );
        localStorage.setItem("comment", JSON.stringify(deletedCom));
        return deletedCom;
      }
      case "DELETE_REPLY": {
        const deleteRep = comments.map((com) =>
          com.id === action.payload.id
            ? {
                ...com,
                replies: com.replies.filter(
                  (rep) => rep.id !== action.payload.reply.id
                ),
              }
            : com
        );
        localStorage.setItem("comment", JSON.stringify(deleteRep));
        return deleteRep;
      }
      default:
        return comments;
    }
  };
  const [comments, dispatch] = useReducer(reducer, []);

  // set initialize comments from jsong file either from local or reducer
  const setDispatchComments = (comments: Comment[]) => {
    dispatch({
      type: "SET_COMMENTS",
      payload: comments,
    });
  };
  // load initial comments from data.json or localStorage
  useEffect(() => {
    console.log("😋 This is part of comments: ");
    // localStorage.clear()
    const localComments = localStorage.getItem("comment");
    if (localComments) {
      setDispatchComments(JSON.parse(localComments));
      // console.log("🐙 localComments: ", localComments);
    } else {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data: { currentUser: CurrentUser; comments: Comment[] }) => {
          setCurrentUser(data.currentUser);
          setDispatchComments(data.comments);
          console.log("💎 comments:  ", data.comments);
          localStorage.setItem("comment", JSON.stringify(data.comments));
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    if (!comments || comments.length === 0) return;

    const localOfVotes = localStorage.getItem("votes");
    if (!localOfVotes) {
      const voteList = comments.map((co) => {
        return {
          id: co.id,
          vote: "",
          voteReplies: co.replies.map((re) => {
            return { id: re.id, vote: "" };
          }),
        };
      });
      console.log("list of votes 🌄 ☔ ", voteList);
      localStorage.setItem("votes", JSON.stringify(voteList));
    }
  }, [comments]);

  return (
    <div className="relative bg-very-light-gray h-fill  py-6 px-4 flex flex-col gap-2">
      <UserContext.Provider value={{ comments, dispatch }}>
        {comments.map((comm, ind) => (
          <CommentReply currentUser={currentUser} comment={comm} key={ind} />
        ))}

        <Response currentUser={currentUser} />
      </UserContext.Provider>
    </div>
  );
};

export default Main;
