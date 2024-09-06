"use client";

import { useOnlineRegistration } from "@/stores/useOnlineRegistration";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";

import cn from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export default function ButtonWizardComponent() {
  const { currentPage, setPage } = useOnlineRegistration();
  const page1 = useRef<HTMLDivElement | null>(null);
  const page2 = useRef<HTMLDivElement | null>(null);
  const page3 = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Fungsi untuk mendapatkan panjang div berdasarkan halaman yang aktif
    const updateWidth = () => {
      switch (currentPage) {
        case "data-diri":
          if (page1.current) {
            setWidth(page1.current.offsetWidth);
          }
          break;
        case "formulir-registrasi":
          if (page1.current && page2.current) {
            setWidth(page1.current.offsetWidth + page2.current.offsetWidth);
          }
          break;
        case "informasi-kesehatan":
          if (page1.current && page2.current && page3.current) {
            setWidth(
              page1.current.offsetWidth +
              page2.current.offsetWidth +
              page3.current.offsetWidth,
            );
          }
          break;
        default:
          setWidth(0); // Default jika halaman tidak diketahui
          break;
      }
    };

    // Panggil fungsi updateWidth setiap kali currentPage berubah
    updateWidth();
  }, [currentPage]);

  return (
    <div className="w-full bg-white/80 h-14 flex items-center">
      <div className="flex w-full  text-black/90 absolute z-20">
        <div
          onClick={() => setPage("data-diri")}
          ref={page1}
          className="w-full font-semibold px-3 cursor-pointer flex items-center gap-2"
        >
          <TbCircleNumber1Filled />
          Data Diri
        </div>
        <div
          onClick={() => setPage("formulir-registrasi")}
          ref={page2}
          className="w-full font-semibold px-3 cursor-pointer flex items-center gap-2"
        >
          <TbCircleNumber2Filled />
          Formulir Registrasi
        </div>
        <div
          onClick={() => setPage("informasi-kesehatan")}
          ref={page3}
          className="w-full font-semibold px-3 cursor-pointer flex items-center gap-2"
        >
          <TbCircleNumber3Filled />
          Informasi Kesehatan
        </div>
      </div>
      <div
        className={cn("h-full rounded-r-full duration-200 transition-all ease-in-out", currentPage === "informasi-kesehatan" && 'rounded-r-none')}
        style={{
          width: width,
          background: "linear-gradient(90deg, #ffd401 0%, #fff0a4 100%)" // Kuning (#ffd401) ke Oranye (#ff7300)
        }}
      ></div>

    </div>
  );
}
