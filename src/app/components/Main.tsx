"use client";
import React, { useEffect, useReducer, useState, createContext } from "react";
import CommentReply from "./CommentReply";
import Response from "./Response";

type currentUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type comment = {
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
  replies: reply[];
};

type reply = {
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
};

type Action =
  | { type: "SET_COMMENTS"; payload: comment[] }
  | { type: "ADD_COMMENT"; payload: comment }
  | { type: "EDIT_COMMENT"; payload: comment }
  | {
      type: "EDIT_REPLY";
      payload: { id: number; reply: reply;};
    }
  | { type: "DELETE_COMMENT"; payload: comment };

type contextType = {
  comments: comment[];
  dispatch: React.Dispatch<Action>;
};

export const UserContext = createContext<contextType | null>(null);

const Main = () => {
  const [currentUser, setCurrentUser] = useState<currentUser>();

  const reducer = (comments: comment[], action: Action): comment[] => {
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
      default:
        return comments;
    }
  };
  const [comments, dispatch] = useReducer(reducer, []);

  // load initial user from data.json or localStorage
  useEffect(() => {
    console.log("😋 This is part of current user: ");

    fetch("/data.json")
      .then((response) => response.json())
      .then((data: { currentUser: currentUser }) => {
        setCurrentUser(data.currentUser);
        console.log("💜 current user:  ", data.currentUser);
      })
      .catch((error) => console.error(error));
  }, []);

  // set initialize comments from jsong file either from local or reducer
  const setDispatchComments = (comments: comment[]) => {
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
      console.log("🐙 localComments: ", localComments);
    } else {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data: { comments: comment[] }) => {
          setDispatchComments(data.comments);
          console.log("💎 comments:  ", data.comments);
          localStorage.setItem("comment", JSON.stringify(data.comments));
        })
        .catch((error) => console.error(error));
    }
  }, []);

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
