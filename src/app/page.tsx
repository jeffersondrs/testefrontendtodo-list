"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const isFormEmpty = username.trim() === "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = localStorage.setItem("user", username);

    if (localStorage.getItem("user")!) {
      router.push("/home");
      console.log("user", localStorage.getItem("user"));
    }
  };

  return (
    <main className="flex flex-col  justify-center items-center px-80 lg:px-0 md:px-0 sm:px-0 bg-[#999999] min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end justify-center p-6 border w-[500px] sm:w-full border-gray-400 bg-[#FFFFFF] rounded-2xl gap-3 h-52 sm:h-full"
      >
        <h1 className="text-[22px] text-start w-full font-bold">
          Welcome to CodeLeap network
        </h1>
        <label
          htmlFor="username"
          className="flex flex-col items-start justify-center w-full gap-3"
        >
          Please enter your username
          <input
            className="border-2 border-gray-300 p-2 rounded-lg w-full placeholder:text-[#CCCCCC]"
            type="text"
            placeholder="John Doe"
            onChange={(event) => setUsername(event.target.value)}
          />{" "}
        </label>
        <button
          className={`font-bold text-[#FFFFFF] rounded-lg leading-[18.75px] text-center bg-[#7695EC] w-[120px] py-2 ${
            isFormEmpty ? "opacity-50 pointer-events-none" : ""
          }`}
          type="submit"
          disabled={isFormEmpty}
        >
          Enter
        </button>
      </form>
    </main>
  );
}
