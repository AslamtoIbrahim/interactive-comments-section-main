export type CurrentUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comment = {
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
  replies: Reply[];
};

export type Reply = {
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
};

export type ContextType = {
  comments: Comment[];
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: "SET_COMMENTS"; payload: Comment[] }
  | { type: "ADD_COMMENT"; payload: Comment }
  | { type: "EDIT_COMMENT"; payload: Comment }
  | {
      type: "EDIT_REPLY";
      payload: { id: number; reply: Reply };
    }
  | { type: "DELETE_COMMENT"; payload: Comment }
  | { type: "DELETE_REPLY"; payload: { id: number; reply: Reply } };

 