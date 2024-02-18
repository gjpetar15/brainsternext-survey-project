"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";

import { QuestionsDTO } from "@/types/QuestionDTO";
import { debounce, isNumber, noop } from "lodash";
import { Question } from "@prisma/client";

interface SurveyQuestionListProps {
  surveyId: string;
}

export default function SurveyQuestionList({
  surveyId,
}: SurveyQuestionListProps) {
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);
  }, [surveyId]);

  const handleAddQuestion = async () => {
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text: `Question ${questions.length + 1}`,
      }),
    });

    getQuestions();
  };

  const handleDuplicateQuestion = async (questionId: string) => {
    const question = questions?.find((q) => q.id === questionId);
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text: question?.text,
      }),
    });

    getQuestions();
  };

  const handleQuestionTextChange = debounce(
    async ({ target }: FormEvent<HTMLDivElement>, questionId: string) => {
      const response = await fetch(
        `/api/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            text: (target as any).innerText,
          }),
        }
      );
    },
    500
  );

  const handlePositionChange = async (event: SortableEvent) => {
    if (!isNumber(event.oldIndex)) return;
    const question = questions[event.oldIndex];
    const response = await fetch(
      `/api/surveys/${surveyId}/questions/${question.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          position: event.newIndex,
        }),
      }
    );
    const { data } = await response.json();
  };

  const handleQuestionDelete = async (questionId: string) => {
    try {
      const response = await fetch(
        `/api/surveys/${surveyId}/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );

      const index = questions.findIndex((q: Question) => q.id === questionId);

      if (index !== -1) {
        const questionsAfterDeleted = questions.slice(index + 1);
        for (const question of questionsAfterDeleted) {
          const response = await fetch(
            `/api/surveys/${surveyId}/questions/${question.id}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                position: question.position - 1,
              }),
            }
          );
        }
      }

      getQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div className="rounded-sm shadow-default w-[1050px] mx-auto">
      <div className="grid grid-cols-7 border-t bg-white border-2 border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
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
        setList={noop}
        animation={200}
        handle=".handle"
        onEnd={handlePositionChange}
      >
        {questions.map((item) => (
          <QuestionTemplate
            key={item.id}
            id={item.id}
            text={item.text}
            position={item.position}
            required={item.required}
            surveyId={surveyId}
            handleQuestionDelete={handleQuestionDelete}
            handleDuplicateQuestion={handleDuplicateQuestion}
            handleQuestionTextChange={handleQuestionTextChange}
          />
        ))}
      </ReactSortable>
      <div className="w-full flex justify-center mt-2">
        <button
          className="bg-transparent w-40 flex justify-center py-2 text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px] border-2 rounded-xl"
          onClick={handleAddQuestion}
        >
          Add a Question
        </button>
      </div>
    </div>
  );
}
