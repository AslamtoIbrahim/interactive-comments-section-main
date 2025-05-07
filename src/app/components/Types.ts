export const LOCAL_COMMENT_KEY = "DATA_COMMENT";
export const LOCAL_CURRENTUSER_KEY = "DATA_CURRENTUSER";

export type CurrentUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  voters: Voters[];
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[];
};

export type Reply = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  voters: Voters[];
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

type EditedScore = {
  id: string;
  score: number;
  voters: Voters[];
};

type AddedReply = {
  id: string;
  replies: Reply[];
};

export type UpdatedCommontContent = {
  id: string;
  content: string;
  createdAt: string;
};

export type UpdatedReplyContent = {
  id: string;
  content: string;
  createdAt: string;
};

type UpdatedScoreReply = {
  id: string;
  score: number;
};

export type UpdatedReply = UpdatedReplyContent | UpdatedScoreReply;

export type UpdatedComment = UpdatedCommontContent | EditedScore | AddedReply;

export type ContextType = {
  comments: Comment[];
  addAllComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (comment: UpdatedComment) => void;
  updateReply: (id: string, reply: UpdatedReply) => void;
  deleteComment: (id: string) => void;
  deleteReply: (id: string, nestedId: string) => void;
};

export type Action =
  | { type: "SET_COMMENTS"; payload: Comment[] }
  | { type: "ADD_COMMENT"; payload: Comment }
  | {
      type: "EDIT_COMMENT";
      payload: UpdatedComment;
    }
  | {
      type: "EDIT_REPLY";
      payload: { id: string; reply: UpdatedReply };
    }
  | { type: "DELETE_COMMENT"; payload: { id: string } }
  | { type: "DELETE_REPLY"; payload: { id: string; nestedId: string } };

export type Voters = {
  username: string;
  voteType: string;
};
