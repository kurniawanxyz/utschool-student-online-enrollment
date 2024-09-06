"use client"
import { useState } from "react";
import InputComponent from "../elements/InputComponent";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";

export default function FormDataDiriComponent() {
  const [genderState, setGenderState] = useState<string>("")
  const gender: RadioOption[] = [
    {
      label: "Laki-laki",
      value: "L"
    },
    {
      label: "Perempuan",
      value: "P"
    },
  ]
  return (
    <div className="w-full flex flex-col gap-3">
      <InputComponent
        label="Nama Lengkap"
        name="name"
      />
      <div className="grid grid-cols-2 gap-3">
        <InputComponent
          label="Tempat Lahir"
          name="place-of-birth"
        />
        <InputComponent
          label="Tanggal Lahir"
          name="name"
          type="date"
        />
      </div>
      <div className="flex">
        <RadioButtonGroupComponent
          name="gender"
          options={gender}
          onChange={(value) => setGenderState(value)}
          selectedValue={genderState as string}
          isColumn={false}
        />
      </div>
      <TextArea
        label="Alamat"
        className="text-black"
      />
      <div className="grid grid-cols-2 gap-3">
        <InputComponent
          label="Nomor Telepon"
          name="no-telp"
          type="number"
          placeholder="ex: 62895385*****"
        />
        <InputComponent
          label="Email"
          name="email"
          type="email"
          placeholder="ex: your@gmail.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InputComponent
          label="KTP"
          name="id-card"
          type="number"
          placeholder="ex: 982312378"
        />
        <InputComponent
          label="Hobi"
          name="hobi"
          placeholder="ex: Sepak Bola, Pencak Silat, Futsal"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InputComponent
          label="Nama Sekolah"
          name="school"
        />
        <InputComponent
          label="Nama Jurusan"
          name="major"
        />
      </div>
      <InputComponent
        label="Jurusan Lainya"
        name="other-major"
      />
      <div className="grid grid-cols-2 gap-3">
        <InputComponent
          label="Jumlah Saudara Kandung"
          name="number-of-siblings"
          type="number"
        />
        <InputComponent
          label="Kamu Anak Yang Keberapa"
          name="major"
          type="number"
        />
      </div>
      
    </div>
  )
}