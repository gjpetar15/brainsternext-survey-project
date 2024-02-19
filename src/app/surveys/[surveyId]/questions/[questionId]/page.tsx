"use client";
import { Question } from "@prisma/client";
import { useParams } from "next/navigation";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function PublicSurveyQuestionPage() {
  const [questionData, setQuestionData] = useState<Question>();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { surveyId, questionId } = useParams();

  const getQuestionData = useCallback(async () => {
    const response = await fetch(
      `/api/surveys/${surveyId}/questions/${questionId}`
    );
    const { data } = await response.json();
    setQuestionData(data);
  }, [surveyId, questionId]);

  useEffect(() => {
    getQuestionData();
  }, [getQuestionData]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    if (!inputRef.current) return;
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const answer = formData.get("answer");
    try {
      await fetch(`/api/surveys/${surveyId}/questions/${questionId}/answers`, {
        method: "POST",
        body: JSON.stringify({
          answer,
        }),
      });

      inputRef.current.value = "";
      alert("Your answer was successfully submitted!");
    } catch (e) {
      alert(
        "Oops.. Something went wrong while submitting the answer, try again."
      );
      console.error("Failed to submit answer!", e);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <h1 className="bg-[#607c3c]/50 backdrop-blur-[2px] text-white text-xl text-left font-bold mx-20 px-5 py-4 rounded-t-xl">
          {questionData?.position}.{" "}
          {questionData ? questionData.text : "Loading..."}
        </h1>
        <form className="flex flex-col gap-5 mx-20" onSubmit={handleFormSubmit}>
          <textarea
            ref={inputRef}
            name="answer"
            rows={10}
            className="p-2 rounded-b-xl outline-none"
            required={questionData?.required || false}
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="bg-transparent w-[30%] hover:bg-[#D9D9D9]/50 border-2 border-white rounded-full hover:backdrop-blur-[2px] p-2 text-white font-bold uppercase"
            >
              Submit Answer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
