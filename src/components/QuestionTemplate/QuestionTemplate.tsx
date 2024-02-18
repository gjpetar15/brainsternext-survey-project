import React from "react";
import Switch from "../Switch/Switch";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaClone, FaTrash } from "react-icons/fa";

interface QuestionTemplateProps {
  id: string;
  text: string;
  position: number;
  required: boolean;
  surveyId: string;
  handleQuestionDelete: (questionId: string) => void;
  handleDuplicateQuestion: (questionId: string) => void;
  handleQuestionTextChange: (e: any, questionId: string) => void;
}

export default function QuestionTemplate(props: QuestionTemplateProps) {
  return (
    <div className="bg-[#D9D9D9]/50 backdrop-blur-[2px]">
      <div
        className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 text-white font-semibold text-lg sm:grid-cols-9 md:px-6 2xl:px-7.5"
        key={props.id}
      >
        <div className="col-span-1 flex items-center gap-2 handle cursor-move">
          <IoReorderThreeSharp className="text-2xl" />
          {props.position}
        </div>
        <div
          className="col-span-6 flex items-center !border-0 !outline-0"
          contentEditable
          onInput={(e) => props.handleQuestionTextChange(e, props.id)}
          suppressContentEditableWarning={true}
        >
          {props.text}
        </div>
        <div className="col-span-1">
          <Switch
            surveyId={props.surveyId}
            questionRequired={props.required}
            questionId={props.id}
          />
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <button className="hover:text-primary py-2 px-2 rounded text-lg">
            <FaClone onClick={() => props.handleDuplicateQuestion(props.id)} />
          </button>
          <button className="hover:text-danger py-2 px-2 rounded text-lg">
            <ConfirmationDialog
              message="Are you sure you want to delete this question?"
              handleConfirm={() => props.handleQuestionDelete(props.id)}
            >
              <FaTrash />
            </ConfirmationDialog>
          </button>
        </div>
      </div>
    </div>
  );
}
