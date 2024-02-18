import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import SentimentScoreMeter from "@/components/SentimentScoreMeter/SentimentScoreMeter";

interface SurveyQuestionReportPageProps {
  params: {
    surveyId: string;
    questionId: string;
  };
}

const getQuestion = async (surveyId: string, questionId: string) => {
  const question = await prisma.question.findFirstOrThrow({
    where: {
      id: questionId,
      surveyId,
    },
    include: {
      report: true,
    },
  });

  return question;
};

const getQuestionData = async (surveyId: string, questionId: string) => {
  const answers = await prisma.questionAnswer.findMany({
    where: {
      question: {
        id: questionId,
        surveyId,
      },
    },
  });

  return answers;
};

export default async function SurveyQuestionReportPage({
  params,
}: SurveyQuestionReportPageProps) {
  const question = await getQuestion(params.surveyId, params.questionId);
  const answers = await getQuestionData(params.surveyId, params.questionId);

  const keywords = (question.report?.keywords || []).splice(0, 10);

  return (
    <div className="container">
      <div className="grid grid-cols-7 gap-10">
        <div className="col-span-5">
          <p className="mb-5 text-white text-2xl font-bold">{question.text}</p>
          <table className="w-full table-auto rounded-sm shadow-default bg-[#D9D9D9]/50 backdrop-blur-[2px]">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 text-lg">
                <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Answer
                </th>
                <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                  Score
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 text-white xl:pl-11">
                    {answer.answer}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 text-white font-semibold xl:pl-11">
                    {answer.sentimentScore}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 text-white font-semibold xl:pl-11">
                    {answer.sentimentLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-10">
            <Link
              href={`/dashboard/reports/${params.surveyId}`}
              className="flex justify-center space-x-2.5 px-4 py-2 border border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px]"
            >
              Back to questions list
            </Link>
            {question.report ? (
              <div className="border border-stroke bg-gray-2 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h6 className="border-b border-[#eee] bg-gray-2 text-black font-semibold text-lg p-3 text-center">
                  Sentiment score
                </h6>
                <SentimentScoreMeter value={question.report.sentimentScore} />
              </div>
            ) : null}
            {keywords.length ? (
              <div className="rounded-sm border border-stroke shadow-default">
                <table className="w-full table-auto bg-[#D9D9D9]/50 backdrop-blur-[2px]">
                  <thead>
                    <tr className="bg-gray-2 text-left text-lg">
                      <th className="min-w-[120px] py-4 px-4 font-bold text-black xl:pl-11">
                        Keywords
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((keyword) => (
                      <tr key={keyword}>
                        <td className="border-b border-[#eee] text-white font-semibold text-lg py-5 px-4 xl:pl-11">
                          {keyword}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
