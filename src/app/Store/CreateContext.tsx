import React from "react";
import { ContextType } from "../components/Types";

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
