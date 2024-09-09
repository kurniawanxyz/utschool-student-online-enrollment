"use client"
import { useState } from "react";
import InputComponent from "../elements/InputComponent";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";


export default function FormInformasiKesehatanComponent() {
  const [usingGlasses, setUsingGlasses] = useState<string>()
  const [blainColor, setBlainColor] = useState<string>()
  const [movingProgram, setMovingProgram] = useState<string>()
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
        name="address"
        className="text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent
          label="Berat badan (kg)"
          type="number"
          name="place_of_birth"
        // defaultValue={}
        />
        <InputComponent
          label="Tinggi badan (cm)"
          name="date_of_birth"
          type="date"
        // defaultValue={dataDiri["date_of_birth"]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah anda memakai kacamata?
        </p>
        <RadioButtonGroupComponent
          name="placement"
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
          name="placement"
          className="flex"
          options={confirm}
          onChange={(value) => setBlainColor(value)}
          selectedValue={blainColor as string}
          isColumn={false}
        />
      </div>
      <TextArea
        label="Alamat & no. telepon yang dapat dihubungi jika ada sesuatu yang penting"
        name="address"
        className="text-black"
      />
      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah Anda ingin memindahkan program / diarahkan oleh sekolah (sesuai dengan hasil evaluasi sekolah )
        </p>
        <RadioButtonGroupComponent
          name="placement"
          className="flex"
          options={confirm}
          onChange={(value) => setMovingProgram(value)}
          selectedValue={movingProgram as string}
          isColumn={false}
        />
      </div>
      <TextArea
        label="Informasi Tambahan"
        name="address"
        className="text-black"
      />
      <InputComponent
        label="Foto"
        name="date_of_birth"
        type="file"
      // defaultValue={dataDiri["date_of_birth"]}
      />
      <InputComponent
        label="Foto Diploma"
        name="date_of_birth"
        type="file"
      // defaultValue={dataDiri["date_of_birth"]}
      />
      <InputComponent
        label="Foto KTP"
        name="date_of_birth"
        type="file"
      // defaultValue={dataDiri["date_of_birth"]}
      />
    </form>

  )
}