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
  | { type: "ADD_COMMENT"; payload: comment };

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
    const localComments = localStorage.getItem("comment");
    if (localComments) {
      setDispatchComments(JSON.parse(localComments));
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
    <div className="bg-very-light-gray h-fill  py-6 px-4 flex flex-col gap-2">
      <UserContext.Provider value={{ comments, dispatch }}>
        {comments.map((comm, ind) => (
          <CommentReply
            username={currentUser?.username}
            comment={comm}
            key={ind}
          />
        ))}

        <Response currentUser={currentUser} />
      </UserContext.Provider>
    </div>
  );
};

 

export default Main;
