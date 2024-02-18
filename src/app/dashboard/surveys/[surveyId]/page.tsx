import SurveyForm from "@/components/SurveyForm/SurveyForm";
import SurveyQuestionList from "@/components/SurveyQuestionList/SurveyQuestionList";
import { SurveyDTO } from "@/types/SurveyDTO";
import { SurveyStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
const getSurveyById = async (id: string): Promise<SurveyDTO> => {
  const response = await fetch(`${process.env.API_URL}/surveys/${id}`);
  return response.json();
};

type SurveyEditPageParams = {
  params: {
    surveyId: string;
  };
};

export default async function SurveyEditPage({
  params: { surveyId },
}: SurveyEditPageParams) {
  const { data: survey } = await getSurveyById(surveyId);
  const title = ["Editing survey", survey.name].join(" ");
  const updateSurvey = async (formData: FormData) => {
    "use server";
    const data: Partial<SurveyDTO["data"]> = {
      name: formData.get("name") as string,
      manager: formData.get("manager") as string,
      introduction: formData.get("introduction") as string,
      status: formData.get("status") as SurveyStatus,
    };

    const response = await fetch(`${process.env.API_URL}/surveys/${surveyId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
  };

  return (
    <div className="flex flex-col ">
      <div className="w-[1100px] mx-auto">
        <div className="flex justify-end">
          <Link href="/dashboard/surveys">
            <button className=" mr-7 flex items-center space-x-2.5 px-4 py-2 border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px]">
              Back to Surveys
            </button>
          </Link>
        </div>
      </div>
      <SurveyForm
        title={title}
        defaultValues={survey}
        updateSurvey={updateSurvey}
      />
      <SurveyQuestionList surveyId={surveyId} />
    </div>
  );
}
