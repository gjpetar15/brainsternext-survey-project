import { Survey } from "@prisma/client";

export type SurveyListResponse = {
  data: Survey[];
};
