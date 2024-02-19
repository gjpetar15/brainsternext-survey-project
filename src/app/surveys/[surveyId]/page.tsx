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
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="text-white text-7xl font-bold text-center">
        Welcome to Our <br /> Survey!
      </h1>
      <h1 className="text-white font-bold text-center my-10 text-xl">
        Your voice matters. This survey is a safe space for your thoughts.
        <br /> Let's shape our workplace together.
      </h1>
      <Link href={startUrl}>
        <button className="flex items-center space-x-2.5 px-6 py-3 border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px]">
          Let's Start!
        </button>
      </Link>
    </div>
  );
}
