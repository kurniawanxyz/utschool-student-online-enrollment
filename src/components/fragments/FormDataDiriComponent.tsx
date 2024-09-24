/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import InputComponent from "../elements/InputComponent";
import RadioButtonGroupComponent, {
  RadioOption,
} from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";
import { useOnlineRegistration } from "@/stores/useOnlineRegistration";
import {
  FormDataDiriSchema,
  FormDataDiriType,
} from "@/schemas/FormDataDiriSchema";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";

export default function FormDataDiriComponent() {
  const [genderState, setGenderState] = useState<string>("");
  const [schoolType, setSchoolType] = useState<string>("");
  const [other_major, setOtherMajor] = useState<boolean>(false);

  const gender: RadioOption[] = [
    {
      label: "Laki-laki",
      value: "L",
    },
    {
      label: "Perempuan",
      value: "P",
    },
  ];


  useEffect(()=>{
    if(localStorage.getItem("major") === "Lainya"){
      setOtherMajor(true);
    }
  },[])


  const school_type: RadioOption[] = [
    {
      label: "SMK",
      value: "SMK",
    },
    {
      label: "SMA",
      value: "SMA",
    },
  ];

  const { dataDiri, setDataDiri, setPage } = useOnlineRegistration();

  async function FormDataDiriService(formdata: FormData) {
    localStorage.setItem("major", formdata.get("major") as string);
    if(other_major){
      localStorage.setItem("other_major", formdata.get("other_major") as string);
    }
    try {
      const payload: FormDataDiriType = {
        full_name: formdata.get("full_name") as string,
        place_of_birth: formdata.get("place_of_birth") as string,
        date_of_birth: formdata.get("date_of_birth") as string,
        gender: formdata.get("gender") as string,
        address: formdata.get("address") as string,
        telephone_number: formdata.get("telephone_number") as string,
        email: formdata.get("email") as string,
        id_card: formdata.get("id_card") as string,
        hobby: formdata.get("hobby") as string,
        school_of_origin: formdata.get("school_of_origin") as string,
        school_type: formdata.get("school_type") as string,
        major: other_major ? formdata.get("other_major") as string : formdata.get("major") as string,
      };
      const result = FormDataDiriSchema.safeParse(payload);
      if (!result.success) {
        // Iterate over each error issue
        result.error.issues.forEach((error: ZodIssue) => {
          // Extract path and message from the error
          const message = error.message;
          console.error(error);

          // Display the error using toast
          toast.error(`${message}`);
        });
        return false;
      }

      toast.success("Pengisian data diri berhasil dilakukan");
      setDataDiri(result.data);
      setPage("formulir-registrasi");
    } catch (error) {
      toast.error(error as unknown as string);
    }
  }

  useEffect(() => {
    setGenderState(dataDiri["gender"]);
    setSchoolType(dataDiri["school_type"]);
  }, []);

  return (
    <form action={FormDataDiriService} className="w-full flex flex-col gap-5">
      <InputComponent
        label="Nama Lengkap"
        name="full_name"
        defaultValue={dataDiri["full_name"]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent
          label="Tempat Lahir"
          name="place_of_birth"
          defaultValue={dataDiri["place_of_birth"]}
        />
        <InputComponent
          label="Tanggal Lahir"
          name="date_of_birth"
          type="date"
          defaultValue={dataDiri["date_of_birth"]}
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
        name="address"
        defaultValue={dataDiri["address"]}
        className="text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent
          label="Nomor Telepon"
          name="telephone_number"
          type="number"
          placeholder="ex: 62895385*****"
          defaultValue={dataDiri["telephone_number"]}
        />
        <InputComponent
          label="Email"
          name="email"
          type="email"
          placeholder="ex: your@gmail.com"
          defaultValue={dataDiri["email"]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent
          label="KTP"
          name="id_card"
          type="number"
          placeholder="ex: 982312378"
          defaultValue={dataDiri["id_card"]}
        />
        <InputComponent
          label="Hobi"
          name="hobby"
          placeholder="ex: Sepak Bola, Pencak Silat, Futsal"
          defaultValue={dataDiri["hobby"]}
        />
      </div>
      <div className="flex">
        <RadioButtonGroupComponent
          name="school_type"
          options={school_type}
          onChange={(value) => setSchoolType(value)}
          selectedValue={schoolType as string}
          isColumn={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <InputComponent
          label="Nama Sekolah"
          defaultValue={dataDiri["school_of_origin"]}
          name="school_of_origin"
        />
        <div className="flex flex-col">
          <label htmlFor="grade" className="mb-2 text-black">
            Jurusan
          </label>
          <select
            name="major"
            defaultValue={localStorage.getItem("major")??""}
            onChange={(value)=>{
              if(value.target.value === "Lainya"){
                setOtherMajor(true);
              }else{
                setOtherMajor(false);
              }
            }}
            className="border text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Pilih Jurusan
            </option>
            <option value="Teknik Alat Berat">Teknik Alat Berat</option>
            <option value="Teknik Kendaraan Ringan">Teknik Kendaraan Ringan</option>
            <option value="Teknik Bisnis Sepeda Motor">Teknik Bisnis Sepeda Motor</option>
            <option value="Teknik Instalasi dan Tenaga Litrik">Teknik Instalasi dan Tenaga Litrik</option>
            <option value="Lainya">Lainya</option>
          </select>
        </div>
        <InputComponent
          label="Nama Jurusan"
          name="other_major"
          className={`${other_major ? "block" : "hidden"}`}
          defaultValue={localStorage.getItem("other_major")??""}
        />
      </div>


      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary/80 px-3 py-1 rounded text-black/80 hover:bg-primary hover:shadow"
        >
          Selanjutnya
        </button>
      </div>
    </form>
  );
}
