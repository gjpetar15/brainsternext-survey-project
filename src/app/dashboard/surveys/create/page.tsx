"use client";
import SurveyForm from "@/components/SurveyForm/SurveyForm";
import { SurveyDTO } from "@/types/SurveyDTO";
import { SurveyStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function SurveyCreatePage() {
  const router = useRouter();

  const createSurvey = async (formData: FormData) => {
    const data: Partial<SurveyDTO["data"]> = {
      name: formData.get("name") as string,
      manager: formData.get("manager") as string,
      introduction: formData.get("introduction") as string,
      status: formData.get("status") as SurveyStatus,
    };

    try {
      const response = await fetch(`${process.env.API_URL}/surveys`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      router.push(`/dashboard/surveys/${jsonData.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <h1 className="text-3xl font-semibold text-white">Create Survey</h1>
        <button
          onClick={() => router.push("/dashboard/surveys")}
          className="flex items-center space-x-2.5 px-4 py-2 bg-primary rounded-md text-white font-medium"
        >
          Back to Surveys
        </button>
      </div>
      <SurveyForm title="Create a Survey" updateSurvey={createSurvey} />;
    </>
  );
}
