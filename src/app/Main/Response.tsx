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
  console.log("🎨", currentUser?.image.png);
  
  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input />
      <section className="flex items-center justify-between">
        <Picture mb={currentUser?.image.png} dt={currentUser?.image.webp} />
        <Button />
      </section>
    </div>
  );
};

export default Response;
