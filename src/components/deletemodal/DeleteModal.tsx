import { useState, FormEvent } from "react";

interface DeleteModalProps {
  cancelDelete: () => void;
  id: number;
}

export default function DeleteModal({ cancelDelete, id }: DeleteModalProps) {
  const [objectId, setObjectId] = useState(id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      id: objectId,
    };

    await fetch(`https://dev.codeleap.co.uk/careers/${objectId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <form
      className="absolute z-50 flex flex-col gap-5 border-[#999999] border rounded-2xl sm:w-full md:w-full w-[754px] p-6 bg-[#FFFFFF]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[22px] leading-6 font-bold text-[#000000]">
        Are you sure you want to delete this item?
      </h1>
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <button
          className="font-bold text-[#000000] rounded-lg leading-[18.75px] text-center border border-[#000000] bg-white w-[120px] h-8"
          type="submit"
          onClick={cancelDelete}
        >
          Cancel
        </button>
        <button
          className="font-bold text-[#FFFFFF] rounded-lg leading-[18.75px] text-center bg-[#FF5151] w-[120px] h-8"
          type="submit"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
