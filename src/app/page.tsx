"use client";

import Form from "@/components/form/Form";
import Post from "@/components/todopost/Post";

export default function Home() {
  return (
    <main className="flex flex-col px-80 lg:px-0 md:px-0 sm:px-0 bg-[#999999]">
      <header className="flex flex-row justify-between items-center p-4 bg-[#7695EC] h-20">
        <h1 className="text-[22px] font-bold text-[#ffffff] leading-6">
          CodeLeap Network
        </h1>
      </header>
      <section className="flex flex-col items-center justify-center flex-1 p-6 border border-gray-400 gap-6 bg-[#FFFFFF]">
        <div className="border-[#999999] border rounded-2xl sm:w-full md:w-full w-[754px] p-6">
          <Form />
        </div>

        <Post />
      </section>
    </main>
  );
}
