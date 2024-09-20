import { z } from "zod";

export const FormOnlineEnrollmentSchema = z.object({
  training_program_id: z
    .string()
    .uuid({ message: "ID program pelatihan tidak valid" }),
  learning_pattern: z
    .string()
    .min(1, "Pola Pembelajaran wajib diisi minimal 1 karakter")
    .max(500, "Form pola pembelajaran maksimal 500 karakter"),
  is_willing_to_relocate: z.enum(["1", "0"]),
  compliance_agreement: z.enum(["1", "0"]),
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
  past_illnesses: z.string().optional(), // Uncomment if you want to add this field
  weight: z.string().regex(/^\d+kg$/, {
    message: "Format berat badan tidak valid, contoh: '70kg'",
  }),
  height: z.string().regex(/^\d+cm$/, {
    message: "Format tinggi badan tidak valid, contoh: '170cm'",
  }),
  wear_glasses: z.enum(["1", "0"]), // Converts 0 or 1 ke boolean
  color_blindness: z.enum(["1", "0"]), // Converts 0 atau 1 ke boolean
  address_and_phone_number: z
    .string()
    .nonempty({ message: "Alamat dan nomor telepon tidak boleh kosong" }),
  school_transfer_option: z.enum(["1", "0"]),
  major: z.string().nonempty({
    message: "Jurusan sekolah tidak boleh kosong",
  }), // Converts 0 atau 1 ke boolean
  motivation: z
    .string()
    .min(1, "Form inputan motivasi minimal 1 karakter")
    .max(500, "Form input motivasi maksimal 500 karatker"),
  additional_information: z.string().optional(),
  student_photo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File harus berupa gambar",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Ukuran file foto maskimal 10 MB",
    }),
  diploma_photo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File harus berupa gambar",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Ukuran foto diploma maskimal 10 MB",
    }),
  identity_photo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File harus berupa gambar",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Ukuran file KTP maskimal 10 MB",
    }),
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
  school_type: true,
  major: true,
});

export const FormRegistrasiOnlineSchema = FormOnlineEnrollmentSchema.pick({
  learning_pattern: true,
  is_willing_to_relocate: true,
  compliance_agreement: true,
  training_program_id: true,
  learning_point_id: true,
  sobat_school_id: true,
  motivation: true,
});

export const FormInformasiKesehatanSchema = FormOnlineEnrollmentSchema.pick({
  past_illnesses: true,
  weight: true,
  height: true,
  wear_glasses: true,
  color_blindness: true,
  address_and_phone_number: true,
  school_transfer_option: true,
  additional_information: true,
  student_photo: true,
  diploma_photo: true,
  identity_photo: true,
});

export type FormDataDiriType = z.infer<typeof FormDataDiriSchema>;
export type FormRegistrasiOnline = z.infer<typeof FormRegistrasiOnlineSchema>;
export type FormInfromasiKesehatanType = z.infer<
  typeof FormInformasiKesehatanSchema
>;
