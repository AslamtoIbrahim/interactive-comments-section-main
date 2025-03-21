import React from 'react'
import Comment from './Comment'
import Response from './Response'

const Main = () => {
  return (
    <div className='bg-very-light-gray h-screen py-8 px-4 flex flex-col gap-3'>
      <Comment />
      <Response />
    </div>
  )
}

export default Main
