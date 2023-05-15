"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface EditModalProps {
  cancelEdit: () => void;
  content: string;
  title: string;
  id: number;
}

export default function EditModal({
  cancelEdit,
  content,
  id,
  title,
}: EditModalProps) {
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);
  const [objectId, setObjectId] = useState(id);

  const isFormEmpty = title.trim() === "" || content.trim() === "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      id: objectId,
      title: titleEdit,
      content: contentEdit,
    };

    await fetch(`https://dev.codeleap.co.uk/careers/${objectId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      window.location.reload();
    });
  };

  const handleTitleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(event.target.value);
  };

  return (
    <form
      className="absolute z-50 flex flex-col gap-5 border-[#999999] border rounded-2xl sm:w-full md:w-full w-[754px] p-6 bg-[#FFFFFF]"
      onSubmit={handleSubmit}
      key={id}
    >
      <h1 className="tex-[22px] leading-6 font-bold text-[#000000]">
        Edit item
      </h1>
      <label htmlFor="titleEdit" className="flex flex-col gap-2">
        TitleEdit
        <input
          className="border-2 border-gray-300 p-2 rounded-lg w-full placeholder:text-[#CCCCCC]"
          type="text"
          placeholder="Hello World"
          value={titleEdit}
          onChange={handleTitleEditChange}
        />
      </label>
      <label htmlFor="titleEdit" className="flex flex-col gap-2">
        ContentEdit
        <textarea
          className="border-2 border-gray-300 p-1 rounded-lg w-full h-[74px] max-h-[164px]  placeholder:text-[#CCCCCC]"
          maxLength={500}
          placeholder="ContentEdit here"
          value={contentEdit}
          onChange={(event) => setContentEdit(event.target.value)}
        />
      </label>
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <button
          className={`font-bold text-[#000000] rounded-lg leading-[18.75px] text-center border border-[#000000] bg-white w-[120px] h-8 pointer-events-none" : ""
          `}
          type="submit"
          onClick={cancelEdit}
        >
          Cancel
        </button>
        <button
          className={`font-bold text-[#FFFFFF] rounded-lg leading-[18.75px] text-center bg-[#47B960] w-[120px] h-8
          ${isFormEmpty ? "opacity-50 pointer-events-none" : ""}`}
          type="submit"
          disabled={isFormEmpty}
        >
          Save
        </button>
      </div>
    </form>
  );
}
