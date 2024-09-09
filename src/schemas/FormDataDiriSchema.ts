import { z } from "zod";

export const FormOnlineEnrollmentSchema = z.object({
  training_program_id: z
    .string()
    .uuid({ message: "ID program pelatihan tidak valid" }),
  learning_pattern: z.string(),
  is_willing_to_relocate: z
    .union([z.boolean(), z.number()])
    .transform((val) => !!val), // Converts 0 or 1 to boolean
  compliance_agreement: z
    .union([z.boolean(), z.number()])
    .transform((val) => !!val), // Converts 0 atau 1 ke boolean
  full_name: z
    .string()
    .nonempty({ message: "Nama lengkap tidak boleh kosong" }),
  place_of_birth: z
    .string()
    .nonempty({ message: "Tempat lahir tidak boleh kosong" }),
  date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Format tanggal lahir tidak valid",
  }),
  gender: z.string().nonempty({ message: "Jenis kelamin tidak boleh kosong" }), // 'L' untuk laki-laki, 'P' untuk perempuan
  address: z.string().nonempty({ message: "Alamat tidak boleh kosong" }),
  telephone_number: z.string(),
  email: z.string().email({ message: "Format email tidak valid" }),
  id_card: z.string().nonempty({ message: "Nomor KTP tidak boleh kosong" }),
  hobby: z.string().nonempty({ message: "Hobi tidak boleh kosong" }),
  school_type: z
    .string()
    .nonempty({ message: "Jenis sekolah tidak boleh kosong" }),
  school_of_origin: z
    .string()
    .nonempty({ message: "Asal sekolah tidak boleh kosong" }),
  sobat_school_id: z.string().uuid({ message: "ID sobat sekolah tidak valid" }),
  learning_point_id: z
    .string()
    .uuid({ message: "ID titik belajar tidak valid" }),
  //past_illnesses: z.string().optional(),  // Uncomment if you want to add this field
  weight: z.string().regex(/^\d+kg$/, {
    message: "Format berat badan tidak valid, contoh: '70kg'",
  }),
  height: z.string().regex(/^\d+cm$/, {
    message: "Format tinggi badan tidak valid, contoh: '170cm'",
  }),
  wear_glasses: z.union([z.boolean(), z.number()]).transform((val) => !!val), // Converts 0 or 1 ke boolean
  color_blindness: z.union([z.boolean(), z.number()]).transform((val) => !!val), // Converts 0 atau 1 ke boolean
  address_and_phone_number: z
    .string()
    .nonempty({ message: "Alamat dan nomor telepon tidak boleh kosong" }),
  school_transfer_option: z
    .union([z.boolean(), z.number()])
    .transform((val) => !!val),
  major: z.string().nonempty({
    message: "Jurusan sekolah tidak boleh kosong",
  }), // Converts 0 atau 1 ke boolean
});

export const FormDataDiriSchema = FormOnlineEnrollmentSchema.pick({
  full_name: true,
  place_of_birth: true,
  date_of_birth: true,
  gender: true,
  address: true,
  telephone_number: true,
  email: true,
  id_card: true,
  hobby: true,
  school_of_origin: true,
  school_type: true, // Assuming "jurusan name" refers to "school_type"
  major: true,
});

export type FormDataDiriType = z.infer<typeof FormDataDiriSchema>;
