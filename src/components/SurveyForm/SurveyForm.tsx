"use client";

import { SurveyDTO } from "@/types/SurveyDTO";
import { FormEventHandler, useMemo } from "react";

interface SurveyFormProps {
  title: string;
  defaultValues?: SurveyDTO["data"];
  updateSurvey: (formData: FormData) => void;
}

export default function SurveyForm(props: SurveyFormProps) {
  const defaultValues: Partial<SurveyDTO["data"]> = useMemo(() => {
    return props.defaultValues || {};
  }, [props]);

  return (
    <div className="bg-transparent shadow-default w-[1100px] mx-auto mb-10">
      <form action={props.updateSurvey}>
        <div className="p-6.5">
          <div className="mb-4.5 bg-[#D9D9D9]/50 backdrop-blur-[2px]  flex justify-center py-4 rounded-2xl">
            <div className="w-[95%]">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Survey Name"
                className="w-full bg-white rounded-full py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
                defaultValue={defaultValues.name}
              />
            </div>
          </div>

          <div className="w-full bg-[#D9D9D9]/50 backdrop-blur-[2px] mt-5 flex justify-center py-4 rounded-2xl font-bold">
            <div className="w-[95%]">
              <label
                className="mb-2.5 block text-white dark:text-white text-2xl"
                htmlFor="introduction"
              >
                Introduction Message*
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows={6}
                className="w-full rounded-2xl bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={defaultValues.introduction!}
              ></textarea>

              <div className="w-[50%] ">
                <label
                  className=" mt-4 mb-2.5 block text-white dark:text-white text-2xl"
                  htmlFor="introduction"
                >
                  Admin Email*
                </label>
                <input
                  id="manager"
                  name="manager"
                  type="email"
                  className="w-full rounded-full bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  defaultValue={defaultValues.manager}
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-[#D9D9D9]/50 backdrop-blur-[2px] mt-5 flex justify-center py-4 rounded-2xl font-bold">
            <div className="w-[95%]">
              <label
                className="mb-2.5 block text-white text-xl"
                htmlFor="status"
              >
                Status
              </label>
              <div className="relative z-20 bg-white rounded-t-2xl">
                <select
                  className="relative z-20 w-full appearance-none bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  id="status"
                  name="status"
                  defaultValue={defaultValues.status}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="FINISHED">Finished</option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
            <button className="flex w-40 justify-center items-center space-x-2.5 px-4 py-2 border-2 rounded-xl text-white font-bold hover:bg-[#D9D9D9]/50 hover:backdrop-blur-[2px]">
              Save Survey
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
