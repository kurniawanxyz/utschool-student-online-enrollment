"use client";

import { IoIosArrowUp } from "react-icons/io";

const ButtonFooterComponent = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Menambahkan animasi smooth scroll
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="absolute left-1/2 -translate-x-1/2 -top-4 bg-black/95 p-2 h-10 w-10 flex items-center justify-center text-primary rounded-full text-2xl font-bold"
    >
      <IoIosArrowUp />
    </button>
  );
};

export default ButtonFooterComponent;
