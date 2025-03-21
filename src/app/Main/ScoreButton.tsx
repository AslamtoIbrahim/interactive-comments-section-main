'use client'
import React, { useState } from 'react'

type prop = {
  score?: number
  setOnclickScore?: (score: number) => void;
  
}

const ScoreButton = ({score = 2, setOnclickScore}:prop) => {
  const [scores, setscores] = useState(score);

  const handleIncrement = () => {
    if (setOnclickScore){
      setOnclickScore(scores + 1)
      setscores(scores + 1)
    }
  }
  const handleDecrement = () => {
    if (setOnclickScore && scores > 0){
      setOnclickScore(scores - 1)
      setscores(scores - 1)
    }
  }
  return (
    <div className='bg-very-light-gray text-moderate-blue/55  w-fit font-rubik font-medium  py-1 px-3 rounded-lg flex items-center gap-4  '>
      <button onClick={handleIncrement} className='cursor-pointer'>+</button>
      <p className='text-moderate-blue'>{scores}</p>
      <button onClick={handleDecrement} className='cursor-pointer'>-</button>
    </div>
  )
}

export default ScoreButton
