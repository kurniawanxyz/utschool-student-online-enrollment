/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import InputComponent from "../elements/InputComponent";
import RadioButtonGroupComponent, {
  RadioOption,
} from "../elements/RadioButtonGroupComponent";
import TextArea from "../elements/TextAreaComponent";
import { FormInformasiKesehatanSchema } from "@/schemas/FormDataDiriSchema";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";
import { useOnlineRegistration } from "@/stores/useOnlineRegistration";
import { fd } from "@/utils/fetch";
import { useRouter } from "next/navigation";

export default function FormInformasiKesehatanComponent() {
  const [usingGlasses, setUsingGlasses] = useState<string>();
  const [blainColor, setBlainColor] = useState<string>();
  const [movingProgram, setMovingProgram] = useState<string>();
  const { setDataInformasiKesehatan, setPage, dataInformasiKesehatan } = useOnlineRegistration()
  const router = useRouter()

  const confirm: RadioOption[] = [
    {
      label: "Iya",
      value: "1",
    },
    {
      label: "Tidak",
      value: "0",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("data-registration")) {
      toast.warning("Pastikan data terisi")
      setPage("formulir-registrasi")
    }
  }, [])

  async function HandleAction(formData: FormData) {

    if (formData.get("button") === "kembali") {
      setPage("formulir-registrasi")
      return false;
    }

    if (!formData.get("student_photo") || !formData.get("diploma_photo") || !formData.get("identity_photo")) {
      toast.error("Pastikan semua inputan terisi")
      return false;
    }
    console.log(formData.get("student_photo"))

    const payload = {
      past_illnesses: formData.get("past_illnesses") as string,
      weight: formData.get("weight"),
      height: formData.get("height"),
      wear_glasses: formData.get("wear_glasses") as "1" | "0",
      color_blindness: formData.get("color_blindness") as "1" | "0",
      address_and_phone_number: formData.get("address_and_phone_number") as string,
      school_transfer_option: formData.get("school_transfer_option") as "1" | "0",
      additional_information: formData.get("additional_information") as string,
      student_photo: formData.get("student_photo") as File,
      diploma_photo: formData.get("diploma_photo") as File,
      identity_photo: formData.get("identity_photo") as File
    };
    const result = FormInformasiKesehatanSchema.safeParse(payload);
    if (!result.success) {
      result.error.issues.forEach((error: ZodIssue) => {
        const message = error.message;
        console.error(error);
        toast.error(`${message}`);
      });
      return false;
    }
    setDataInformasiKesehatan(result.data);

    if (formData.get("button") === "selanjutnya") {
      const dataDiri = localStorage.getItem("data-diri") as string;
      const dataRegistrasi = localStorage.getItem("data-registration") as string;
      const dataInformasiKesehatan = localStorage.getItem("data-informasi-kesehatan") as string;
      const studentPhoto = formData.get("student_photo");
      const diplomaPhoto = formData.get("diploma_photo");
      const identityPhoto = formData.get("identity_photo");

      // Memastikan semua data ada
      // Parsing hanya jika tipe data string
      const parsedDataDiri = JSON.parse(dataDiri);
      const parsedDataRegistrasi = JSON.parse(dataRegistrasi);
      const parsedDataInformasiKesehatan = JSON.parse(dataInformasiKesehatan);

      // Menggabungkan data JSON
      const combinedData = {
        ...parsedDataDiri,
        ...parsedDataRegistrasi,
        ...parsedDataInformasiKesehatan
      };

      // Membuat FormData baru untuk mengirim file dan data lainnya
      const formDataToSend = new FormData();
      Object.entries(combinedData).forEach(([key, value]) => {
        console.log(key, value)
        formDataToSend.append(key, String(value))
      })


      console.log({ combinedData })

      // Menambahkan data JSON ke dalam FormData

      // Menambahkan file ke dalam FormData (jika ada)
      formDataToSend.append('student_photo', studentPhoto as Blob);
      formDataToSend.append('diploma_photo', diplomaPhoto as Blob);
      formDataToSend.append('identity_photo', identityPhoto as Blob);
      console.log(formDataToSend.get("student_photo"));
      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const res = await fd("registration", {
        method: "POST",
        body: formDataToSend
      }, true)
      console.log(res)

      if (!res.meta.success) {
        if (typeof res.data === "string") {
          toast.error(res.data)
        } else {
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              const element = res.data[key][0];
              console.log(element)
              toast.error(element)
            }
          }
        }

        return false;
      }

      localStorage.removeItem("data-diri")
      localStorage.removeItem("data-registration")
      localStorage.removeItem("data-informasi-kesehatan")

      toast.success("Berhasil melakukan pendaftaran")
      router.refresh()
      router.push("/")
    }
  }

  useEffect(() => {
    if (dataInformasiKesehatan) {
      setBlainColor(dataInformasiKesehatan.color_blindness)
      setUsingGlasses(dataInformasiKesehatan.wear_glasses)
      setMovingProgram(dataInformasiKesehatan.school_transfer_option)
    }
  }, [dataInformasiKesehatan])
  console.log(movingProgram, blainColor)

  return (
    <form action={HandleAction} className="w-full flex flex-col gap-5">
      <TextArea
        label="Apakah Anda pernah menderita penyakit serius dan harus dirawat?"
        name="past_illnesses"
        className="text-black"
        defaultValue={dataInformasiKesehatan.past_illnesses}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputComponent defaultValue={dataInformasiKesehatan.weight} label="Berat badan (kg)" type="text" name="weight" />
        <InputComponent defaultValue={dataInformasiKesehatan.height} label="Tinggi badan (cm)" name="height" type="text" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black">Apakah anda memakai kacamata?</p>
        <RadioButtonGroupComponent
          name="wear_glasses"
          className="flex"
          options={confirm}
          onChange={(value) => setUsingGlasses(value)}
          selectedValue={usingGlasses as string}
          isColumn={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black">Apakah anda memiliki buta warna?</p>
        <RadioButtonGroupComponent
          name="color_blindness"
          className="flex"
          options={confirm}
          onChange={(value) => setBlainColor(value)}
          selectedValue={blainColor as string}
          isColumn={false}
        />
      </div>

      <TextArea
        label="Alamat & no. telepon yang dapat dihubungi jika ada sesuatu yang penting"
        name="address_and_phone_number"
        className="text-black"
        defaultValue={dataInformasiKesehatan.address_and_phone_number}
      />

      <div className="flex flex-col gap-2">
        <p className="text-black">
          Apakah Anda ingin memindahkan program / diarahkan oleh sekolah (sesuai
          dengan hasil evaluasi sekolah)?
        </p>
        <RadioButtonGroupComponent
          name="school_transfer_option"
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
        defaultValue={dataInformasiKesehatan.additional_information}
      />

      <InputComponent label="Foto" name="student_photo" type="file" />

      <InputComponent label="Foto Diploma" name="diploma_photo" type="file" />

      <InputComponent label="Foto KTP" name="identity_photo" type="file" />

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
          name="button"
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
