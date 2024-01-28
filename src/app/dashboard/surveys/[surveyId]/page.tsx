"use client";

import SurveyForm from "@/components/SurveyForm/SurveyForm";
import SurveyQuestionList from "@/components/SurveyQuestionList/SurveyQuestionList";
import { useParams } from "next/navigation";

export default function SurveyEditPage() {
  const { surveyId } = useParams();

  const title = ["Editing survey with id", surveyId].join(" ");

  return (
    <div className="flex flex-col gap-5">
      <SurveyForm title={title} />
      <SurveyQuestionList />
    </div>
  );
}
