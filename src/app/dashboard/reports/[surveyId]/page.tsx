import Link from "next/link";
import { HiOutlineDocumentReport } from "react-icons/hi";
import React from "react";
import prisma from "@/lib/prisma";

const getQuestionsForSurvey = async (surveyId: string) => {
  const questions = await prisma.question.findMany({
    where: {
      surveyId,
    },
    include: {
      report: true,
      answers: true,
    },
  });

  const data = questions.map(({ id, text, answers, report }) => ({
    id,
    text,
    answersCount: answers.length,
    score: report?.sentimentScore,
  }));

  return data;
};

interface SurveyQuestionsPageProps {
  params: {
    surveyId: string;
  };
}

export default async function SurveyQuestionsPage({
  params,
}: SurveyQuestionsPageProps) {
  const questions = await getQuestionsForSurvey(params.surveyId);

  return (
    <div className="rounded-sm border border-stroke shadow-default">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto bg-[#D9D9D9]/50 backdrop-blur-[2px]">
          <thead>
            <tr className="bg-gray-2 text-left text-lg">
              <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                Question
              </th>
              <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                Answers
              </th>
              <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                Sentiment Score
              </th>
              <th className="py-4 px-4 font-bold text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="border-b text-white font-semibold text-lg border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {question.text}
                </td>
                <td className="border-b text-white font-semibold text-lg border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {question.answersCount}
                </td>
                <td className="border-b text-white font-semibold text-lg border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {question.score || "N/A"}
                </td>
                <td className="border-b text-white font-semibold text-lg border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <Link
                    className="hover:text-primary text-2xl"
                    href={`/dashboard/reports/${params.surveyId}/questions/${question.id}`}
                  >
                    <HiOutlineDocumentReport />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
