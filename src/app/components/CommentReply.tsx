import CommentView from "./CommentView";
import ReplyView from "./ReplyView";
import { Comment, CurrentUser } from "./Types";

type InteractiveComment = {
  currentUser: CurrentUser;
  comment: Comment;
};
const CommentReply = ({ comment, currentUser }: InteractiveComment) => {

  return (
    <div className="flex flex-col gap-4">
      <CommentView comment={comment} currentUser={currentUser} />
      <div className="flex flex-col border-l border-grayish-blue/50 pl-4 gap-2">
        {comment.replies.map((reply) => (
          <ReplyView
            comment={comment}
            key={reply.id}
            reply={reply}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentReply;
