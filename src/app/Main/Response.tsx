import React from "react";
import Input from "./Input";
import Button from "./Button";
import Picture from "./Picture";

interface user {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
type prop = {
  currentUser: user;
};
const Response = ({ currentUser }: prop) => {
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input />
      <section className="flex items-center justify-between">
        {/* <Picture mb={currentUser.image.png} dt={currentUser.image.webp} /> */}
        <p>{currentUser.username}</p>
        <Button />
      </section>
    </div>
  );
};

export default Response;
