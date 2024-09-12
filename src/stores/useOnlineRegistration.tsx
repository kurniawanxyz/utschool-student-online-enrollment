import { FormDataDiriType, FormRegistrasiOnline } from "@/schemas/FormDataDiriSchema";
import { create } from "zustand";

type formOnlineregistrationType = {
  name?: string;
};

type formPage = "data-diri" | "formulir-registrasi" | "informasi-kesehatan";

type useOnlineRegistrationType = {
  data: formOnlineregistrationType;
  dataDiri: FormDataDiriType;
  dataRegistration: FormRegistrasiOnline;
  setData: (data: formOnlineregistrationType) => void;
  setDataDiri: (data: FormDataDiriType) => void;
  currentPage: formPage;
  setPage: (page: formPage) => void;
  setDataRegistration: (data: FormRegistrasiOnline) => void;
};

// Fungsi untuk mengambil data dari localStorage
const getLocalStorageData = (): formOnlineregistrationType => {
  const storedData = localStorage.getItem("data");
  return storedData ? JSON.parse(storedData) : {}; // Mengembalikan data yang disimpan atau objek kosong
};

const getDataDiriStorageData = (): FormDataDiriType => {
  const storedData = localStorage.getItem("data-diri");
  return storedData ? JSON.parse(storedData) : {}; // Mengembalikan data yang disimpan atau objek kosong
};

const getDataRegistration = (): FormRegistrasiOnline => {
  const storedData = localStorage.getItem("data-registration");
  return storedData ? JSON.parse(storedData) : {}; // Mengembalikan data yang disimpan atau objek kosong
};

// // Fungsi untuk menyimpan data ke localStorage
// const setLocalStorageData = (data: formOnlineregistrationType) => {
//   localStorage.setItem("data", JSON.stringify(data));
// };

const setDataDiriStorageData = (data: FormDataDiriType) => {
  localStorage.setItem("data-diri", JSON.stringify(data));
};

const setRegistrationStorageData = (data: FormRegistrasiOnline) => {
  localStorage.setItem("data-registration", JSON.stringify(data));
};

// Fungsi untuk mengambil currentPage dari localStorage dengan validasi tipe
const getCurrentPage = (): formPage => {
  const currentPage = localStorage.getItem("current-page");
  const validPages: formPage[] = [
    "data-diri",
    "formulir-registrasi",
    "informasi-kesehatan",
  ];

  // Validasi apakah currentPage ada dalam daftar validPages
  return validPages.includes(currentPage as formPage)
    ? (currentPage as formPage)
    : "data-diri";
};

// Definisikan store menggunakan Zustand
export const useOnlineRegistration = create<useOnlineRegistrationType>(
  (set, get) => ({
    // Panggil langsung fungsi untuk inisialisasi store
    data: getLocalStorageData(), // Inisialisasi data dari localStorage
    currentPage: getCurrentPage(), // Inisialisasi currentPage dari localStorage
    dataDiri: getDataDiriStorageData(),
    dataRegistration: getDataRegistration(),
    setDataRegistration : (data)=> {
      set({ dataRegistration: data });
      setRegistrationStorageData(data);
    },
    setPage: (page: formPage) => {
      set({ currentPage: page });
      localStorage.setItem("current-page", page);
    },
    setData: (formData) => {
      const { dataDiri } = get();
      const newData = { ...dataDiri, ...formData }; // Gabungkan data lama dan data baru

      set({ data: newData });

      // Simpan data terbaru ke localStorage
    },
    setDataDiri: (data) => {
      set({ dataDiri: data });
      setDataDiriStorageData(data);
    },
  }),
);
