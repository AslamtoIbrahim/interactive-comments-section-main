"use client";
import React, { useRef, useState } from "react";

interface ButtonProps {
  voting: string;
  score?: number;
  setOnVoteListener?: (vote: string) => void;
  setOnScoreListener?: (score: number) => void;
}

const ScoreButton = ({
  voting,
  score,
  setOnVoteListener,
  setOnScoreListener,
}: ButtonProps) => {
  const [scores, setScores] = useState(score ?? 0);
  const votes = useRef<string>(voting);
  console.log("votes 🌐:   ", votes.current);

  const handleIncrement = () => {
    console.log("befor testing voests 🔵  ", votes.current);
    if (votes.current === "up") return;

    console.log("votes ✅  ", votes.current);
    const newVote = votes.current === "" ? "up" : "";
    votes.current = newVote;
    setOnVoteListener?.(newVote);

    const newScore = scores + 1;
    setScores(newScore);
    setOnScoreListener?.(newScore);
  };

  const handleDecrement = () => {
    if (votes.current === "down") return;

    const newVote = votes.current === "" ? "down" : "";
    votes.current = newVote;
    setOnVoteListener?.(newVote);

    const newScore = scores - 1;
    setScores(newScore);
    setOnScoreListener?.(newScore);
  };
  return (
    <div className="bg-very-light-gray text-moderate-blue/55  w-fit font-rubik font-medium  md:text-lg py-1 px-3 md:px-4 rounded-lg flex md:flex-col items-center   gap-4 md:gap-2  ">
      <button
        onClick={handleIncrement}
        className="cursor-pointer hover:text-moderate-blue"
      >
        +
      </button>
      <p className="text-moderate-blue">{scores}</p>
      <button
        onClick={handleDecrement}
        className="cursor-pointer hover:text-moderate-blue"
      >
        -
      </button>
    </div>
  );
};

export default ScoreButton;
