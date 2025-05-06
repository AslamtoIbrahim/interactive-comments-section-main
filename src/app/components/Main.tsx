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
  // const defaultUser = {
  //   image: {
  //     png: "",
  //     webp: "",
  //   },
  //   username: "",
  // };
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
    // localStorage.clear()
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

  useEffect(() => {
    if (!dataContext.comments || dataContext.comments.length === 0) return;

    const localOfVotes = localStorage.getItem("votes");
    if (!localOfVotes) {
      const voteList = dataContext.comments.map((comment) => {
        return {
          id: comment.id,
          vote: "",
          voteReplies: comment.replies.map((reply) => {
            return { id: reply.id, vote: "" };
          }),
        };
      });
      // console.log("list of votes 🌄 ☔ ", voteList);
      // localStorage.setItem("votes", JSON.stringify(voteList));
    }
  }, [dataContext.comments]);

  return (
    <div className="relative h-fill py-6 px-4 flex flex-col gap-2">
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
        <p>wait ...</p>
      )}
    </div>
  );
};

export default Main;
