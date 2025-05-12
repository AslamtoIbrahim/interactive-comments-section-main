"use client";
import React, { useEffect, useState, useContext } from "react";
import CommentReply from "./CommentReply";
import Response from "./Response";
import {
  CurrentUser,
  Comment,
  LOCAL_COMMENT_KEY,
  LOCAL_CURRENTUSER_KEY,
} from "./Types";
import InstractiveContext from "../Store/CreateContext";

const Main = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const dataContext = useContext(InstractiveContext);

  // set initialize comments from jsong file either from local or reducer
  const setAllComents = (comments: Comment[]) => {
    console.log("setAllComents: 🚖", comments);
    dataContext.addAllComments(comments);
  };
  // load initial comments from data.json or localStorage
  useEffect(() => {
    console.log("😋 This is part of comments: ");
    const localComent = localStorage.getItem(LOCAL_COMMENT_KEY);
    const localCurrentUser = localStorage.getItem(LOCAL_CURRENTUSER_KEY);
    if (localComent && localCurrentUser) {
      const dataUser: CurrentUser = JSON.parse(localCurrentUser);
      console.log("🎃 data: ", dataUser);
      setCurrentUser(dataUser);
      const dataComment: Comment[] = JSON.parse(localComent);
      console.log("✅ After setCurrentUser: ", currentUser);
      setAllComents(dataComment);
    } else {
      fetch("/data/data.json")
        .then((response) => response.json())
        .then((data: { currentUser: CurrentUser; comments: Comment[] }) => {
          setCurrentUser(data.currentUser);
          setAllComents(data.comments);
          console.log("💎 comments:  ", data.comments);
          console.log("🌌🪐 currentUser:  ", data.currentUser);
          localStorage.setItem(
            LOCAL_COMMENT_KEY,
            JSON.stringify(data.comments)
          );
          localStorage.setItem(
            LOCAL_CURRENTUSER_KEY,
            JSON.stringify(data.currentUser)
          );
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div className="relative h-fill py-6 px-4 md:px-10 lg:px-20 xl:px-[35rem] flex flex-col gap-2">
      {dataContext.comments && currentUser ? (
        <>
          {dataContext.comments.map((comment) => (
            <CommentReply
              currentUser={currentUser}
              comment={comment}
              key={comment.id}
            />
          ))}
          <Response currentUser={currentUser} />
        </>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <p className="text-grayish-blue text-lg md:text-2xl">wait ...</p>
        </div>
      )}
    </div>
  );
};

export default Main;
