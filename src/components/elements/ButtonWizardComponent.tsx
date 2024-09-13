"use client";

import { useOnlineRegistration } from "@/stores/useOnlineRegistration";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import cn from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export default function ButtonWizardComponent() {
  const { currentPage, setPage } = useOnlineRegistration();
  const page1 = useRef<HTMLDivElement | null>(null);
  const page2 = useRef<HTMLDivElement | null>(null);
  const page3 = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
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
          setWidth(0);
          break;
      }
    };

    // Update width when currentPage changes
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [currentPage]);

  return (
    <div className="w-full bg-white/80 relative h-14 md:h-16 lg:h-14 flex items-center rounded-full overflow-hidden ">
      <div className="flex w-full text-black/90 absolute z-20 ">
        <div
          ref={page1}
          className={cn(
            "w-full font-semibold px-2 text-xl  md:px-4 lg:px-3  flex items-center gap-2 transition-all duration-200",
            [
              "data-diri",
              "formulir-registrasi",
              "informasi-kesehatan",
            ].includes(currentPage)
              ? "text-black"
              : "text-gray-600 ",
          )}
        >
          <TbCircleNumber1Filled className="text-2xl" />
          <p className="hidden lg:inline">Data diri</p>
        </div>
        <div
          ref={page2}
          className={cn(
            "w-full font-semibold px-2 text-xl  md:px-4 lg:px-3  flex items-center gap-2 transition-all duration-200",
            ["informasi-kesehatan", "formulir-registrasi"].includes(currentPage)
              ? "text-black"
              : "text-gray-600 ",
          )}
        >
          <TbCircleNumber2Filled className="text-2xl" />
          <p className="hidden lg:inline">Formulir registrasi</p>
        </div>
        <div
          ref={page3}
          className={cn(
            "w-full font-semibold px-2 text-xl  md:px-4 lg:px-3 flex items-center gap-2 transition-all duration-200",
            currentPage === "informasi-kesehatan"
              ? "text-black"
              : "text-gray-600 ",
          )}
        >
          <TbCircleNumber3Filled className="text-2xl" />
          <p className="hidden lg:inline">Informasi kesehatan</p>
        </div>
      </div>
      <div
        className={cn(
          "h-full rounded-r-full duration-200 transition-all ease-in-out",
          currentPage === "informasi-kesehatan" && "rounded-r-none",
        )}
        style={{
          width: width,
          background: "linear-gradient(90deg, #ffd401 0%, #fff0a4 100%)",
        }}
      ></div>
    </div>
  );
}
