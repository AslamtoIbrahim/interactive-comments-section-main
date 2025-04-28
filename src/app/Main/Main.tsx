"use client";
import React, { useEffect, useState } from "react";
import Response from "./Response";
import CommentReply from "./CommentReply";

const Main = () => {
  const [data, setdata] = useState<{ currentUser?: any; comments: any[] }>({
    currentUser: undefined,
    comments: [],
  });

  // load initial data from data.json or localStorage
  useEffect(() => {
    console.log("hello json 😋");

    const saveData = localStorage.getItem("jsonData");
    if (saveData) {
      setdata(JSON.parse(saveData));
    } else {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          setdata(data);
          console.log(data);
          localStorage.setItem("jsonData", JSON.stringify(data));
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div className="bg-very-light-gray  py-6 px-4 flex flex-col gap-2">
      {data.comments?.map((comment, index) => (
        <CommentReply
          key={index}
          comment={comment}
          username={data.currentUser.username}
          index={index}
        />
      ))}
      <Response data={data} setData={setdata} currentUser={data.currentUser} />
    </div>
  );
};

export default Main;
