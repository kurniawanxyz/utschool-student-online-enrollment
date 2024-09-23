"use client"

import Image from "next/image"
import ButtonWizardComponent from "../elements/ButtonWizardComponent"
import { useOnlineRegistration } from "@/stores/useOnlineRegistration"
import dynamic from "next/dynamic"

const LoadingComponent = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
    <p className="text-2xl ml-4">Loading...</p>
  </div>
);

const FormDataDiriComponent = dynamic(() => import("./FormDataDiriComponent"), {
  loading: () => <LoadingComponent />,
});
const FormRegistrationComponent = dynamic(() => import("./FormRegistrationComponent"), {
  loading: () => <LoadingComponent />,
});
const FormInformasiKesehatanComponent = dynamic(() => import("./FormInformasiKesehatanComponent"), {
  loading: () => <LoadingComponent />,
});
export default function FormOnlineRegistrationComponent() {
  const { currentPage } = useOnlineRegistration()
  
  return (
    <div className="relative min-h-[150vh] mt-5 py-5">
      <Image
        src={"/images/siswa/1.jpg"}
        alt="UT SCHOOL"
        width={1000}
        height={1000}
        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover z-0"
      />
      <div className="w-3/4 mx-auto mt-20 min-h-[50vh] z-10  rounded-md shadow-inner shadow-white bg-white/30  backdrop-blur-lg overflow-hidden p-5 md:p-10">
        <h2 className="text-2xl text-center font-extrabold text-black">Form Pendaftaran Siswa</h2>
        <ButtonWizardComponent />
        <div className="z-20 w-full mt-10">
          {
            currentPage === "data-diri" && <FormDataDiriComponent />
          }
          {
            currentPage === "formulir-registrasi" && <FormRegistrationComponent />
          }
          {
            currentPage === "informasi-kesehatan" && <FormInformasiKesehatanComponent />
          }
        </div>
        <div className="absolute bg-white/20 h-full w-full top-0 bottom-0 left-0 right-0 blur-xl -z-10 brightness-50">
        </div>
      </div>

    </div>
  )
}