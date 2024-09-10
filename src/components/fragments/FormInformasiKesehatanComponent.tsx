"use client";
import { useState } from "react";
import InputComponent from "../elements/InputComponent";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";

export default function FormInformasiKesehatanComponent() {
  const [usingGlasses, setUsingGlasses] = useState<string>();
  const [blainColor, setBlainColor] = useState<string>();
  const [movingProgram, setMovingProgram] = useState<string>();

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

  return (
    <form className="w-full flex flex-col gap-5">
      <TextArea
        label="Apakah Anda pernah menderita penyakit serius dan harus dirawat?"
        name="illness_history"
        className="text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent
          label="Berat badan (kg)"
          type="number"
          name="weight"
        />
        <InputComponent
          label="Tinggi badan (cm)"
          name="height"
          type="number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah anda memakai kacamata?
        </p>
        <RadioButtonGroupComponent
          name="using_glasses"
          className="flex"
          options={confirm}
          onChange={(value) => setUsingGlasses(value)}
          selectedValue={usingGlasses as string}
          isColumn={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah anda memiliki buta warna?
        </p>
        <RadioButtonGroupComponent
          name="color_blind"
          className="flex"
          options={confirm}
          onChange={(value) => setBlainColor(value)}
          selectedValue={blainColor as string}
          isColumn={false}
        />
      </div>

      <TextArea
        label="Alamat & no. telepon yang dapat dihubungi jika ada sesuatu yang penting"
        name="contact_address"
        className="text-black"
      />

      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah Anda ingin memindahkan program / diarahkan oleh sekolah (sesuai dengan hasil evaluasi sekolah)?
        </p>
        <RadioButtonGroupComponent
          name="moving_program"
          className="flex"
          options={confirm}
          onChange={(value) => setMovingProgram(value)}
          selectedValue={movingProgram as string}
          isColumn={false}
        />
      </div>

      <TextArea
        label="Informasi Tambahan"
        name="additional_information"
        className="text-black"
      />

      <InputComponent
        label="Foto"
        name="photo"
        type="file"
      />

      <InputComponent
        label="Foto Diploma"
        name="diploma_photo"
        type="file"
      />

      <InputComponent
        label="Foto KTP"
        name="ktp_photo"
        type="file"
      />
    </form>
  );
}
