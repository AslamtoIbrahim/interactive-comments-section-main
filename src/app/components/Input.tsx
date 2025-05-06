import React, { ForwardedRef, useRef, useState } from "react";

interface InputValueProp {
  text?: string;
}


const InputInner = (
  { text }: InputValueProp,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  

  const [textValue, setTextValue] = useState(text || "");

  const handleOnchneg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <div>
      <textarea
        ref={ref}
        className="font-rubik text-dark-blue outline-none border-light-gray border-[1px]
      w-full rounded-md placeholder:text-grayish-blue py-2 px-4 min-h-20 resize-none"
        value={textValue}
        placeholder="Add a comment..."
        onChange={handleOnchneg}
      />
    </div>
  );
};

const Input = React.forwardRef(InputInner);

export default Input;


 
