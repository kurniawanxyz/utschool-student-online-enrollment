import { create } from "zustand"

type formOnlineregistrationType = {
    name?: string
}

type useOnlineRegistrationType = {
    data: formOnlineregistrationType | null,
    setData: (data:formOnlineregistrationType)=>void
}

const getLocalStorageData = () => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : {}; // Mengembalikan data yang disimpan atau object kosong
  };
  
  // Fungsi untuk menyimpan data ke localStorage
const setLocalStorageData = (data:formOnlineregistrationType) => {
    localStorage.setItem('data', JSON.stringify(data));
};

export const useOnlineRegistration = create<useOnlineRegistrationType>((set,get)=>({
    data: getLocalStorageData,
    setData: (formData)=>{
        const prev = get().data;
        const newData = { ...prev, ...formData }; // Gabungkan data lama dan data baru
    
        set({
          data: newData,
        });
    
        // Simpan data terbaru ke localStorage
        setLocalStorageData(newData);
    }
}))