"use client";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Response from "./Response";

const Main = () => {
  const [data, setdata] = useState<{ currentUser?: any; comments: any[] }>({
    currentUser: undefined, 
    comments: [],
  });
  // load initial data from data.json or localStorage
  useEffect(() => {
    console.log('hello json 😋');
    
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
    <div className="bg-very-light-gray h-screen py-8 px-4 flex flex-col gap-3">
      <Comment />
      {/* <Response currentUser={data.currentUser} /> */}
      <p>{data.currentUser?.username} </p>
    </div>
  );
};

export default Main;
