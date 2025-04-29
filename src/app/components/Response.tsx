import React, { useRef } from "react";
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
  data: any;
  setData: (data: any) => void;
};
const Response = ({ currentUser, data, setData }: prop) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const sendClick = () => {
    const va = ref.current?.value;
    console.log("🌵 send: ", va);
    if (va === "") {
      return;
    }
    // add comment to data
    const newComment = {
      id: 4,
      content: va,
      createdAt: "28-08-2025",
      score: 0,
      user: {
        image: {
          png: data.currentUser?.image.png,
          webp: data.currentUser?.image.webp,
        },
        username: data.currentUser?.username,
      },
    };

    const updateData = [...data?.comments, newComment];
    setData(updateData);
    console.log(data);
  };

  return (
    <div className="bg-white p-4 rounded-md font-rubik flex flex-col gap-3">
      <Input ref={ref} />
      <section className="flex items-center justify-between">
        <Picture
          mb={data.currentUser?.image.png}
          dt={data.currentUser?.image.webp}
        />
        <Button clcik={sendClick} />
      </section>
    </div>
  );
};

export default Response;
