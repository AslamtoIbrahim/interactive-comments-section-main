import React from "react";
import { ContextType } from "../../utils/Types";

const InstractiveContext = React.createContext<ContextType>({
  comments: [],
  addAllComments: () => {},
  addComment: () => {},
  updateComment: () => {},
  updateReply: () => {},
  deleteComment: () => {},
  deleteReply: () => {},
});

export default InstractiveContext;
