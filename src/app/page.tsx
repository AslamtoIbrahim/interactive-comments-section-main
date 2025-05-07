import React from "react";
import Main from "./components/Main";
import IntractiveComment from "./Store/IntractiveComment";

const page = () => {
  return (
    <div className="h-full bg-very-light-gray">
      <IntractiveComment>
        <Main />
      </IntractiveComment>
    </div>
  );
};

export default page;
