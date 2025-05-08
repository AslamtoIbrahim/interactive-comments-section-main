import React, { useEffect, useRef } from "react";

type prop = {
  text: string;
  setTextInput: (input: string) => void;
};
const EditTextView = ({ text, setTextInput }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current!.value = text;
  }, []);

  const onchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <div>
      <textarea
        onChange={onchangeHandler}
        ref={ref}
        className="font-rubik text-dark-blue outline-none border-light-gray border-[1px]
      w-full rounded-md placeholder:text-grayish-blue py-2 px-4 min-h-20 resize-none"
        placeholder="Add a comment..."
      />
    </div>
  );
};

export default EditTextView;
