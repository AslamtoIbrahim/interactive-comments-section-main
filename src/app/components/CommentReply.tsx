import React, { useContext } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import { UserContext } from "./Main";

type prop = {
  username?: string;
  comment: any;
  index?: number;
};
const CommentReply = ({ comment, username, index }: prop) => {
  const useComent = useContext(UserContext);

  return (
    <div className="flex flex-col gap-4">
      <Comment comment={comment} currentUserName={username} index={index} />
      <div className="flex flex-col border-l border-grayish-blue/50 pl-4 gap-2">
        {comment.replies.map((reply: any, index: number) => (
          <Reply
            key={index}
            comment={reply}
            currentUserName={username}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentReply;
