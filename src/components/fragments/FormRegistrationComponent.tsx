/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import RadioButtonGroupComponent, { RadioOption } from "../elements/RadioButtonGroupComponent";
import { LearningPoint, TrainingProgram, useEnrollmentSchedule } from "@/stores/useEnrollmentSchedule";
import { FormRegistrasiOnline, FormRegistrasiOnlineSchema } from "@/schemas/FormDataDiriSchema";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";
import { useOnlineRegistration } from "@/stores/useOnlineRegistration";

export default function FormRegistrationComponent() {
  const [lp,setLp] = useState<LearningPoint[]>([]);
  const [currentSelect,setCurrentSelect] = useState<"NONE" | "ONE" | "ALL">("NONE")
  const [selectedLp,setSelectedLp] = useState<string>("default");
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

  const [placementQuestion, setPlacementQuestion] = useState<string>();
  const [schoolRegulationQuestion, setSchoolRegulationQuestion] = useState<string>();
  const { schedule ,setSchedule, sobat, setSobat, learning_point, training_program, setLearningPoint } = useEnrollmentSchedule();
  const { dataRegistration, setDataRegistration, setPage } = useOnlineRegistration();
  const [trainingProgramSelected, setTrainingProgramSelected] = useState<string | null>(null);
  const [selectScheduleId, setSelectScheduleId] = useState<string | null>(null);

  useEffect(()=>{
    setLp([]);
  },[])

  useEffect(()=>{
    const test = localStorage.getItem("data-diri")
    if(!test){
      toast.warning("Pastikan data terisi")
      setPage("data-diri")
    }
  },[])

  useEffect(() => {
    if (dataRegistration) {
      setTrainingProgramSelected(dataRegistration.training_program_id);
      setSelectScheduleId(dataRegistration.learning_point_id);
      setPlacementQuestion(dataRegistration.is_willing_to_relocate);
    }
  }, [dataRegistration]);

  useEffect(() => {
    setSchedule();
  }, [setSchedule]);

  useEffect(() => {
    if (trainingProgramSelected && schedule) {
      const data = schedule.filter((item)=>item.training_program_id === trainingProgramSelected).map((item)=>item.learning_point)
      // setLearningPoint(trainingProgramSelected);
      setLp(data as LearningPoint[])
    }
  }, [trainingProgramSelected]);
  console.log({lp})

  useEffect(() => {
    if (selectScheduleId) {
      setSobat(selectScheduleId);
    }
  }, [selectScheduleId]);

  async function FormAction(formdata: FormData) {
    try {
      if(currentSelect != "ALL"){
        toast.error("Pastikan Kamu sudah memilih lokasi pelatihan & lokasi ujian");
        return false;
      }
      
      if (!formdata.get("is_willing_to_relocate") || !formdata.get("learning_point_id") || !formdata.get("learning_point_id") || !formdata.get("sobat_school_id")) {
        toast.error("Pastikan Semua Inputan Terisi");
        return false;
      }


      const payload: FormRegistrasiOnline = {
        is_willing_to_relocate: formdata.get("is_willing_to_relocate") as "1" | "0",
        training_program_id: formdata.get("training_program_id") as string,
        learning_point_id: formdata.get("learning_point_id") as string,
        sobat_school_id: formdata.get("sobat_school_id") as string,
      };
      const result = FormRegistrasiOnlineSchema.safeParse(payload);
      if (!result.success) {
        result.error.issues.forEach((error: ZodIssue) => {
          const message = error.message;
          console.error(error);
          toast.error(`${message}`);
        });
        return false;
      }
      toast.success("Pengisian data diri berhasil dilakukan");
      setDataRegistration(result.data);

      console.log(formdata.get("button"))
      if(formdata.get("button") === "selanjutnya"){
        setPage("informasi-kesehatan");
      }

      if(formdata.get("button") === "kembali"){
        setPage("data-diri");
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form action={FormAction} className="w-full flex flex-col gap-5">

      <div className="flex flex-col gap-2">
        <p className="text-black">
        Apakah Anda siap belajar di luar lokasi atau Domisili anda saat ini? 
        </p>
        <RadioButtonGroupComponent
          name="is_willing_to_relocate"
          className="flex"
          options={confirm}
          onChange={(value) => setPlacementQuestion(value)}
          selectedValue={placementQuestion as string}
          isColumn={false}
        />
      </div>


      <div className="flex flex-col">
        <label className="text-sm font-medium text-black mb-1">Pilih Program Pelatihan</label>
        <select
          defaultValue={trainingProgramSelected ?? ""}
          name="training_program_id"
          onChange={(e) => {
            setTrainingProgramSelected(e.target.value)
            setCurrentSelect("ONE")
            setSelectedLp("default");
          }
          }
          className="block w-full px-4 py-2 text-black capitalize text-sm rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          {training_program && training_program.map((item: TrainingProgram) => (
            <option className="text-black capitalize" key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-5">
        <div className={`flex flex-col ${currentSelect != "NONE" ?'': 'hidden'}`}>
          <label className="text-sm font-medium text-black mb-1">Pilih Lokasi Pelatihan</label>
          <select
            name="learning_point_id"
            defaultValue={selectedLp}
            onChange={(e) =>{
              setSelectedLp(e.target.value)
              setSelectScheduleId(e.target.value)
              setCurrentSelect("ALL")
            }
            }
            className="block w-full px-4 py-2 text-black text-sm capitalize rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="default" disabled>Pilih lokasi pelatihan</option>
            {lp && lp.map((item) => (
              <option className="text-black capitalize" key={item.id} value={item.id}>
                UT School {item.name}
              </option>
            ))}
            {
              lp.length < 1 && <option value="">Tidak ada lokasi pelatihan</option>
            }
          </select>
        </div>

        <div className={`flex flex-col ${currentSelect != "ALL" && 'hidden'}`}>
          <label className={`text-sm font-medium text-black mb-1`}>Pilih Lokasi Ujian</label>
          <select
            name="sobat_school_id"
            defaultValue={dataRegistration?.sobat_school_id ?? "default"}
            className="block w-full px-4 py-2 text-black text-sm capitalize rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="default" selected disabled>Pilih lokasi ujian</option>
            {sobat && sobat.map((item) => (
              <option className="text-black capitalize" key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
            {
              sobat?.length < 1 && <option value="">Tidak ada lokasi ujian</option>
            }
          </select>
        </div>
      </div>
      
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
