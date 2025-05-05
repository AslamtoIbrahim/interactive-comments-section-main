import React, { useContext, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Picture from "./Picture";
import { UserContext } from "./Main";
import { CurrentUser, Reply } from "./Types";

type ResponseProps = {
  currentUser?: CurrentUser;
};

type voteReplies = {
  id: number;
  vote: string;
};

type commentVotes = {
  id: number;
  vote: string;
  voteReplies: voteReplies[];
};

const Response = ({ currentUser }: ResponseProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const context = useContext(UserContext);

  // add comment to data
  const sendClick = () => {
    const comment = ref.current!.value;
    console.log("🌵 send: ", comment);
    if (comment === "") {
      return;
    }

    // get the last id and add to it one so it add new id
    const nexId = Math.max(0, ...context!.comments.map((c) => c.id)) + 1;

    const newComment = {
      id: nexId,
      content: comment,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        image: {
          png: currentUser?.image.png,
          webp: currentUser?.image.webp,
        },
        username: currentUser?.username,
      },
      replies: [] as Reply[],
    };
    context?.dispatch({ type: "ADD_COMMENT", payload: newComment });
    // clear the textarea after adding a comment
    ref.current!.value = "";
    // add a new vote for this new comment
    addNewVote(nexId);
  };

  const addNewVote = (id: number) => {
    const localVotes = localStorage.getItem("votes");
    if (localVotes) {
      const listVotes: commentVotes[] = JSON.parse(localVotes);
      const newObjectVote = {
        id: id,
        vote: "",
        voteReplies: [],
      };
      const newListVote = [...listVotes, newObjectVote];
      localStorage.setItem("votes", JSON.stringify(newListVote));
    }
  };

  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button onClick={sendClick} />
      </section>
    </div>
  );
};

export default Response;
