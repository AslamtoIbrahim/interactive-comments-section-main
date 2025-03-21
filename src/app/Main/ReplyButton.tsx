import Image from 'next/image'
import React from 'react'
import repIcon from '../../../public/source/images/icon-reply.svg'

const ReplyButton = () => {
  return (
    <button className='cursor-pointer   font-rubik text-moderate-blue font-medium flex items-center gap-2'>
        <Image src={repIcon} alt="reply" />
        <span>Reply</span>
    </button>
  )
}

export default ReplyButton
