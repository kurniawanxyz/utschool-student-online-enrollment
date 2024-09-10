/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";
import { ScheduleType, useEnrollmentSchedule } from "@/stores/useEnrollmentSchedule";

export default function FormRegistrationComponent() {
  const confirm: RadioOption[] = [
    {
      label: "Iya",
      value: "yes",
    },
    {
      label: "Tidak",
      value: "no",
    },
  ];


  // Pisahkan state untuk kedua pertanyaan yang berbeda
  const [placementQuestion, setPlacementQuestion] = useState<string>();
  const [schoolRegulationQuestion, setSchoolRegulationQuestion] = useState<string>();
  const { setSchedule, schedule } = useEnrollmentSchedule()
  const [trainingProgramSelected, setTrainingProgramSelected] = useState<string | null>(null);
  useEffect(() => {
    setSchedule()
  }, [setSchedule])
  console.log(schedule)

  return (
    <form className="w-full flex flex-col gap-5">
      <TextArea
        label="Bagaimana pola belajar anda? Jelaskan!"
        name="address"
        className="text-black"
      />
      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah Anda menginginkan pelatihan kerja di luar lokasi saat ini? (Jawa, Banjarmasin, Adaro, Makassar, Medan, Pekanbaru, Semarang)
        </p>
        <RadioButtonGroupComponent
          name="placement"
          className="flex"
          options={confirm}
          onChange={(value) => setPlacementQuestion(value)}
          selectedValue={placementQuestion as string}
          isColumn={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black">Apakah Anda bersedia mematuhi peraturan sekolah?</p>
        <RadioButtonGroupComponent
          name="schoolRegulation"
          className="flex"
          options={confirm}
          onChange={(value) => setSchoolRegulationQuestion(value)}
          selectedValue={schoolRegulationQuestion as string}
          isColumn={false}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-black mb-1">Pilih Tempat Pendidikan</label>
        <select
          onChange={(e) => setTrainingProgramSelected(e.target.value)}
          className='block w-full px-4 py-2 text-black capitalize text-sm  rounded-md shadow-sm focus:ring-primary focus:border-primary'>
          {schedule ? schedule.map((item: ScheduleType) => (
            <option className="text-black capitalize" key={item.training_program_id} value={item.training_program_id}>
              {item.training_program.name}
            </option>
          )) :
            (
              <option>
                <option value="" className="text-black" >Belum ada program pelatihan yang dibuka</option>
              </option>
            )
          }

        </select>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-black mb-1">Program Pelatihan</label>
          <select
            className='block w-full px-4 py-2 text-black text-sm capitalize rounded-md shadow-sm focus:ring-primary focus:border-primary'
          >
            {schedule && trainingProgramSelected ? schedule.find((sch) => sch.training_program_id === trainingProgramSelected)?.learning_point.map((item) => (
              <option className="text-black capitalize" key={item.id} value={item.name}>
                UT School {item.name}
              </option>
            )) : (
              <option>
                <option value="" className="text-black" >Belum memilih program pelatihan</option>
              </option>
            )
            }
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-black mb-1">Pililh Lokasi Ujian</label>
          <select
            className='block w-full px-4 py-2 text-black capitalize text-sm  rounded-md shadow-sm focus:ring-primary focus:border-primary'

          >
            {schedule ? schedule.map((item: ScheduleType) => (
              <option className="text-black capitalize" key={item.created_at} value={item.training_program_id}>
                {item.training_program.name}
              </option>
            )) :
              (
                <option>
                  <option value="" className="text-black" >Belum ada program pelatihan yang dibuka</option>
                </option>
              )
            }

          </select>
        </div>
      </div>

      <TextArea
        label="Jelaskan motivasi Anda untuk mengikuti program sekolah"
        name="address"
        className="text-black"
      />

      <div className="flex justify-between gap-3">
        <button
          name="button"
          value="kembali"
          type="submit"
          className="border border-primary text-primary px-3 py-1 rounded hover:text-black/80 hover:bg-primary hover:shadow"
        >
          Kembali
        </button>
        <button
          type="submit"
          value="selanjutnya"
          className="bg-primary/80 px-3 py-1 rounded text-black/80 hover:bg-primary hover:shadow"
        >
          Selanjutnya
        </button>
      </div>

    </form>
  );
}
