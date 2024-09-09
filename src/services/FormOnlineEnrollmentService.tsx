"use client";
import {
  FormDataDiriSchema,
  FormDataDiriType,
} from "@/schemas/FormDataDiriSchema";
import { useOnlineRegistration } from "@/stores/useOnlineRegistration";
import { toast } from "react-toastify";
import { ZodIssue } from "zod";

export async function FormDataDiriService(formdata: FormData) {
  const { setDataDiri, setPage } = useOnlineRegistration();
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
      major: formdata.get("major") as string,
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
