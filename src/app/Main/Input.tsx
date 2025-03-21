import React from 'react'

const Input = () => {
  return (
    <div>
      <textarea className='font-rubik text-dark-blue outline-none border-light-gray border-[1px]
      w-full rounded-md placeholder:text-grayish-blue py-2 px-4 min-h-20 resize-none'  placeholder='Add a comment...' />
    </div>
  )
}

export default Input
