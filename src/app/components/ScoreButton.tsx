"use client";
import React, { useRef, useState } from "react";

const UP = "up";
const DOWN = "down";
const NO_VOTE = "";

interface ButtonProps {
  voting: string;
  score: number;
  // setOnVoteListener?: (vote: string) => void;
  setOnScoreListener?: (score: number, vote: string) => void;
}

const ScoreButton = ({
  voting,
  score,
  // setOnVoteListener,
  setOnScoreListener,
}: ButtonProps) => {
  const [scores, setScores] = useState(score);
  const votes = useRef<string>(voting);
  console.log("votes 🌐:   ", votes.current);
  console.log("voteReplyValue 😍", voting);

  const handleIncrement = () => {
    console.log("befor testing voests 🔵  ", votes.current);

    if (votes.current === UP) {
      const newScore = scores - 1;
      setScores(newScore);
      const newVote = NO_VOTE;
      votes.current = newVote;
      setOnScoreListener?.(newScore, newVote);
      return;
    }

    if (votes.current === DOWN) {
      const newScore = scores + 2;
      setScores(newScore);
      const newVote = UP;
      votes.current = newVote;
      setOnScoreListener?.(newScore, newVote);
      return;
    }

    console.log("votes ✅  ", votes.current);
    const newVote = UP;
    votes.current = newVote;

    const newScore = scores + 1;
    setScores(newScore);

    setOnScoreListener?.(newScore, newVote);
  };

  const handleDecrement = () => {
    if (votes.current === DOWN) {
      const newScore = scores + 1;
      setScores(newScore);
      const newVote = "";
      votes.current = newVote;
      setOnScoreListener?.(newScore, newVote);
      return;
    }

    if (votes.current === UP) {
      const newScore = scores - 2;
      setScores(newScore);
      const newVote = DOWN;
      votes.current = newVote;
      setOnScoreListener?.(newScore, newVote);
      return;
    }

    const newVote = DOWN;
    votes.current = newVote;

    const newScore = scores - 1;
    setScores(newScore);

    setOnScoreListener?.(newScore, newVote);
  };
  return (
    <div className="bg-very-light-gray text-moderate-blue/55  w-fit font-rubik font-medium  md:text-lg py-1 px-3 md:px-4 rounded-lg flex md:flex-col items-center   gap-4 md:gap-2  ">
      <button
        onClick={handleIncrement}
        className={`cursor-pointer hover:text-moderate-blue ${
          voting === "up" ? "text-moderate-blue" : ""
        }`}
      >
        +
      </button>
      <p className="text-moderate-blue">{scores}</p>
      <button
        onClick={handleDecrement}
        className={`cursor-pointer hover:text-moderate-blue ${
          voting === "down" ? "text-moderate-blue" : ""
        }`}
      >
        -
      </button>
    </div>
  );
};

export default ScoreButton;
