import Comment from "./Comment";
import Reply from "./Reply";

interface IcurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Ireply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}
interface Icomment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Ireply[];
}

type prop = {
  currentUser?: IcurrentUser;
  comment: Icomment;
  index?: number;
};
const CommentReply = ({ comment, currentUser, index }: prop) => {
  // const useComent = useContext(UserContext);

  return (
    <div className="flex flex-col gap-4">
      <Comment comment={comment} currentUser={currentUser} index={index} />
      <div className="flex flex-col border-l border-grayish-blue/50 pl-4 gap-2">
        {comment.replies.map((reply, index) => (
          <Reply
            comment={comment}
            key={index}
            reply={reply}
            currentUser={currentUser}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentReply;
