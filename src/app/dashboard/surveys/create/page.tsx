import SurveyForm from "@/components/SurveyForm/SurveyForm";
import { SurveyDTO } from "@/types/SurveyDTO";
import { SurveyStatus } from "@prisma/client";

export default function SurveyCreatePage() {
  const createSurvey = async (formData: FormData) => {
  "use server";
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
    console.log(jsonData);
    return jsonData.data.id;
  } catch (error) {
    console.error(error);
  }
};

  return <SurveyForm 
        title="Create a Survey" 
        updateSurvey={createSurvey}
  />;
}
