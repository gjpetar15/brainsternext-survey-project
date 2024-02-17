import { QuestionsDTO } from "@/types/QuestionDTO";
import { SurveyDTO } from "@/types/SurveyDTO";
import Image from "next/image";
import Link from "next/link";

const getSurvey = async (id: string): Promise<SurveyDTO> => {
  const response = await fetch(`${process.env.API_URL}/surveys/${id}`);
  return response.json();
};

const getQuestions = async (surveyId: string): Promise<QuestionsDTO> => {
  const response = await fetch(
    `${process.env.API_URL}/surveys/${surveyId}/questions`
  );
  return response.json();
};

interface PublicSurveysPageProps {
  params: {
    surveyId: string;
  };
}

export default async function PublicSurveysPage({
  params,
}: PublicSurveysPageProps) {
  const { data: survey } = await getSurvey(params.surveyId);
  const { data: questions } = await getQuestions(params.surveyId);

  const [firstQuestion] = questions;
  const startUrl = [
    "/surveys",
    params.surveyId,
    "questions",
    firstQuestion.id,
  ].join("/");

  return (
    <div className="container mx-auto my-6 flex items-center flex-col gap-6">
      <Image
        width={32}
        height={32}
        src={"/images/logo/logo-icon.svg"}
        alt="Logo"
      />
      <div className="bg-white rounded-md py-6 text-center w-full drop-shadow-1">
        {survey.introduction}
      </div>
      <Link
        href={startUrl}
        className="bg-primary uppercase font-bold text-white py-2 px-24 rounded-md"
      >
        Let&apos;s start
      </Link>
    </div>
  );
}
