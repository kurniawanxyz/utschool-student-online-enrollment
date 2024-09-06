"use client"

import Image from "next/image"
import ButtonWizardComponent from "../elements/ButtonWizardComponent"

export default function FormOnlineRegistrationComponent() {
  return (
    <div className="relative h-[200vh]">
        <Image
            src={"/images/siswa/1.jpg"}
            alt="UT SCHOOL"
            width={1000}
            height={1000}
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full blur-2xl"
        />
        <div className="w-3/4 left-1/2 -translate-x-1/2 mt-20 h-[50vh] bg-white/50 z-10 absolute rounded-xl overflow-hidden">
            <ButtonWizardComponent/>
        </div>
    </div>
  )
}