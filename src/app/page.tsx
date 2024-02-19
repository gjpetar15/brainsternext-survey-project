"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Home() {
  const router = useRouter();

  const changePage = () => router.push("/dashboard/surveys/create");

  return (
    <div className="h-screen pl-40 grid justify-start content-center">
      <div className="w-[590px] self-stretch flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-[212px] flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch ps-3 text-white text-6xl font-bold leading-[67.20px]">
            Create Your Survey Easily and Efficiently
          </div>

          <div className="self-stretch ps-3 text-white text-lg font-normal leading-7">
            Design and customize your surveys with our user-friendly form.
            Collect valuable insights and make data-driven decisions.
          </div>
        </div>

        <div className="pt-4 justify-start items-start gap-4 inline-flex">
          <div className="py-3 shadow justify-center items-center gap-2 inline-flex">
            <button
              className="flex items-center space-x-2.5 px-4 py-2 border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50"
              onClick={changePage}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
