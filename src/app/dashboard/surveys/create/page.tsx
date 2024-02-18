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
      <div className="w-[1100px] mx-auto">
        <div className="flex justify-end">
          <button
            onClick={() => router.push("/dashboard/surveys")}
            className=" mr-7 flex items-center space-x-2.5 px-4 py-2 border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px]"
          >
            Back to Surveys
          </button>
        </div>
      </div>
      <SurveyForm title="Create a Survey" updateSurvey={createSurvey} />;
    </>
  );
}
