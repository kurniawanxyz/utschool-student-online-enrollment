"use client";
import { useState } from "react";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";

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


    </form>
  );
}
