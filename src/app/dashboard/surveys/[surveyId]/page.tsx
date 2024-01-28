import SurveyForm from "@/components/SurveyForm/SurveyForm";
import SurveyQuestionList from "@/components/SurveyQuestionList/SurveyQuestionList";
import { SurveyResponse } from "@/types/SurveyResponse";

const getSurveyById = async (id: string): Promise<SurveyResponse> => {
  const response = await fetch(`${process.env.API_URL}/surveys/${id}`);
  return response.json();
};

export default async function SurveyEditPage({
  params: { surveyId },
}: {
  params: {
    surveyId: string;
  };
}) {
  const { data: survey } = await getSurveyById(surveyId);
  const title = ["Editing survey", survey.name].join(" ");

  return (
    <div className="flex flex-col gap-5">
      <SurveyForm
        title={title}
        defaultValues={{
          ...survey,
        }}
      />
      <SurveyQuestionList />
    </div>
  );
}
