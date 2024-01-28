"use client";
import { useState } from "react";
import { FaClone, FaTrash } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ReactSortable } from "react-sortablejs";
import Switch from "../Switch/Switch";
import { questions as mockQuestions } from "@/_mocks/questions";

type Question = {
  id: number;
  text: string;
};

export default function SurveyQuestionList() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1">
          <p className="font-medium">Position</p>
        </div>
        <div className="col-span-6 flex">
          <p className="font-medium">Text</p>
        </div>
        <div className="col-span-1 flex">
          <p className="font-medium">Is Required?</p>
        </div>
        <div className="col-span-1"></div>
      </div>
      <ReactSortable
        list={questions}
        setList={setQuestions}
        animation={200}
        handle=".handle"
      >
        {questions.map((item, index) => (
          <div
            className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
            key={item.id}
          >
            <div className="col-span-1 flex items-center gap-2 handle cursor-move">
              <IoReorderThreeSharp className="text-2xl" />
              {index}
            </div>
            <div
              className="col-span-6 flex items-center !border-0 !outline-0"
              contentEditable
            >
              {item.text}
            </div>
            <div className="col-span-1">
              <Switch />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <button className="hover:text-primary py-2 px-2 rounded text-lg">
                <FaClone />
              </button>
              <button className="hover:text-primary py-2 px-2 rounded text-lg">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}
