"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      setUsername(user || "");
    }
  }, []);

  const isFormEmpty = title.trim() === "" || content.trim() === "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("https://dev.codeleap.co.uk/careers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        title: title,
        content: content,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error("An error occurred while creating the item");
      throw error;
    } else {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <h1 className="tex-[22px] leading-6 font-bold text-[#000000]">
        What&#39;s on your mind?
      </h1>
      <label htmlFor="title" className="flex flex-col gap-2">
        Title
        <input
          className="border-2 border-gray-300 p-2 rounded-lg w-full placeholder:text-[#CCCCCC]"
          type="text"
          placeholder="Hello World"
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <label htmlFor="title" className="flex flex-col gap-2">
        Content
        <textarea
          className="border-2 border-gray-300 p-2 rounded-lg w-full h-[74px] max-h-[164px]  placeholder:text-[#CCCCCC]"
          maxLength={500}
          placeholder="Content here"
          value={content}
          onChange={handleContentChange}
        />
      </label>
      <div className="w-full flex flex-row justify-end items-center">
        <button
          className={`font-bold text-[#FFFFFF] rounded-lg leading-[18.75px] text-center bg-[#7695EC] w-[120px] h-8 ${
            isFormEmpty ? "opacity-50 pointer-events-none" : ""
          }`}
          type="submit"
          disabled={isFormEmpty}
        >
          Create
        </button>
      </div>
    </form>
  );
}
