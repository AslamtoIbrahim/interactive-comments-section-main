import React, { ForwardedRef } from "react";

const InputInner = (
  _props: unknown,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <div>
      <textarea
        ref={ref}
        className="font-rubik text-dark-blue outline-none border-light-gray border-[1px]
      w-full rounded-md placeholder:text-grayish-blue py-2 px-4 min-h-20 resize-none"
        placeholder="Add a comment..."
      />
    </div>
  );
};

const Input = React.forwardRef(InputInner);

export default Input;
