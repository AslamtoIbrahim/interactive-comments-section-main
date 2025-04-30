'use client'
import React, { useState } from 'react'

type prop = {
  score?: number
  setOnclickScore?: (score: number) => void;
  
}

const ScoreButton = ({score, setOnclickScore}:prop) => {
  const [scores, setScores] = useState(score ?? 0);


  const handleIncrement = () => {
    if (setOnclickScore){
      setOnclickScore(scores + 1)
      setScores(scores + 1)
    }
  }
  const handleDecrement = () => {
    if (setOnclickScore && scores > 0){
      setOnclickScore(scores - 1)
      setScores(scores - 1)
    }
  }
  return (
    <div className='bg-very-light-gray text-moderate-blue/55  w-fit font-rubik font-medium  md:text-lg py-1 px-3 md:px-4 rounded-lg flex md:flex-col items-center   gap-4 md:gap-2  '>
      <button onClick={handleIncrement} className='cursor-pointer hover:text-moderate-blue'>+</button>
      <p className='text-moderate-blue'>{scores}</p>
      <button onClick={handleDecrement} className='cursor-pointer hover:text-moderate-blue'>-</button>
    </div>
  )
}

export default ScoreButton
