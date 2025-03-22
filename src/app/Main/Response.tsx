import React from "react";
import Input from "./Input";
import Button from "./Button";
import Picture from "./Picture";

const Response = () => {
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input />
      <section className="flex items-center justify-between">
        <Picture />
        <Button />
      </section>
    </div>
  );
};

export default Response;
