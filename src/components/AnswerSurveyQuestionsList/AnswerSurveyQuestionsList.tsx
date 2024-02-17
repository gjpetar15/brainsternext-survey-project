"use client";
import { QuestionsDTO } from "@/types/QuestionDTO";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function AnswerSurveyQuestionsList() {
  const { questionId, surveyId } = useParams();
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);
  }, [surveyId]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div className="bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-md">
      <ul className="divide-y divide-[#eee] rounded-md">
        {questions.map((question) => (
          <li
            className={clsx("flex py-2 px-4 pl-8 relative", {
              "bg-primary": questionId === question.id,
            })}
            key={question.id}
          >
            <div
              className={clsx(
                "absolute top-1/2 transform -translate-y-1/2 left-2 w-4 h-4 bg-blue-500 rounded-full text-xs text-center",
                {
                  "bg-primary text-white": questionId !== question.id,
                  "bg-white text-primary": questionId === question.id,
                }
              )}
            >
              {question.position}
            </div>
            <Link
              href={`/surveys/${surveyId}/questions/${question.id}`}
              className={clsx({
                "text-white": questionId === question.id,
              })}
            >
              {question.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
