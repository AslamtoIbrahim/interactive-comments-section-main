import React from 'react'
import Comment from './Comment';

type prop = {
    comment: any;
}
const CommentReply = ({comment}: prop) => {
  return (
    <div>
      <Comment comment={comment} />
      {comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} />
      ))}
    </div>
  )
}

export default CommentReply
