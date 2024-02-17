import prisma from "@/lib/prisma";
import SurveySchema from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";
import nodemailer from "@/lib/nodemailer";
import { Survey } from "@prisma/client";

const getSurveyEmailTemplateHtml = (survey: Survey) => {
  const surveyUrl = `http://localhost:3000/surveys/${survey.id}`;
  const reportsUrl = `http://localhost:3000/dashboard/reports/${survey.id}`;

  return `<p>You've created a new survey: "${survey.name}".</p>
  Survey link: <a href="${surveyUrl}">${surveyUrl}</a><br />
  Reports link: <a href="${reportsUrl}">${reportsUrl}</a><br />
  
  <p>Good luck!</p>`;
};

export const GET = routeHandler(async () => {
  const surveys = await prisma.survey.findMany({});
  return surveys;
});

export const POST = routeHandler(async (request) => {
  const body = await request.json();
  const validation = await SurveySchema.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;

  const survey = await prisma.survey.create({
    data,
  });

  nodemailer.sendMail({
    from: process.env.SMTP_MAIL_FROM,
    to: survey.manager,
    subject: "New Survey Created",
    html: getSurveyEmailTemplateHtml(survey),
  });

  return survey;
});
