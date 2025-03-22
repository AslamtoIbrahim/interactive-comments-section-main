import React from 'react'

type prop ={
  text?:string
}
const Input = ({text} :prop) => {
  return (
    <div>
      <textarea className='font-rubik text-dark-blue outline-none border-light-gray border-[1px]
      w-full rounded-md placeholder:text-grayish-blue py-2 px-4 min-h-20 resize-none' value={text}  placeholder='Add a comment...' />
    </div>
  )
}

export default Input
