import React from 'react'

type prop = {
    clcik?: () => void;
}
const SendButton = ({clcik} : prop) => {
  return (
    <button onClick={clcik} className='bg-moderate-blue text-white font-rubik uppercase py-2 px-6 rounded-lg 
    cursor-pointer hover:bg-moderate-blue/80'>Send</button>
  )
}

export default SendButton
