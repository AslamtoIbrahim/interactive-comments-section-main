import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

type prop = {
  text: string;
  setTextInput: (input: string) => void;
};
const EditTextView = ({ text, setTextInput }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [play, setplay] = useState("play");
  useEffect(() => {
    ref.current!.value = text;
    console.log("useEffect write: 🖋 ", ref.current!.value);
    console.log("useEffect play: 🖋 ", play);
  }, []);

  const clickme = () => {
    console.log("write: 🖋 ", ref.current!.value);
    setplay("stop");
    console.log("play: 🖋 ", play);

    ref.current!.value = "";
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <div>
      {/* <Button onClick={clickme} /> */}
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
