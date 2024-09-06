"use client";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { HiMiniBars3BottomRight } from "react-icons/hi2";


type LinkNav = {
  text: string;
  url: string;
};

const listPrimaryNav: LinkNav[] = [{ text: "Hubungi Kami", url: "/" }];

let listSecondaryNav: LinkNav[] = [
  { text: "Alur Pendaftaran", url: "/" },
  { text: "Jadwal Seleksi", url: "/selection-schedule" },
  { text: "Syarat Pendaftaran", url: "/registration-requirement" },
  { text: "Pedaftaran Online", url: "/online-registration" },
  { text: "Pengumuman Hasil Seleksi", url: "/announcement-selection" },
];

export function NavbarComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbar1Height, setNavbar1Height] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk toggle menu mobile
  const currentBp = useBreakpoint();
  const [activeLinkDimensions, setActiveLinkDimensions] = useState<{
    width: number;
    left: number;
  } | null>(null);

  const navbar1Ref = useRef<HTMLDivElement | null>(null);
  const pathNow = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    if (navbar1Ref.current) {
      setNavbar1Height(navbar1Ref.current.offsetHeight);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const activeLink = document.querySelector(
        '[data-active="true"]'
      ) as HTMLElement;
      if (activeLink) {
        const { width, left } = activeLink.getBoundingClientRect();
        setActiveLinkDimensions({ width, left });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathNow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navbar1Ref.current) {
        setNavbar1Height(navbar1Ref.current.offsetHeight);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (currentBp !== "sm") {
    listSecondaryNav = listSecondaryNav.filter(
      (item: LinkNav) =>
        !listPrimaryNav.some((item2: LinkNav) => item2.text === item.text)
    );
  }

  return (
    <nav className="fixed top-0 w-full z-[1000000]">
      {/* Navbar1 */}
      <div
        ref={navbar1Ref}
        className="bg-black transition-transform py-1 flex items-center justify-end px-5 lg:px-20"
        style={{
          transform:
            scrollPosition > 100
              ? `translateY(-${navbar1Height}px)`
              : "translateY(0)"
        }}
      >
        <ul className="flex gap-3 text-[11px]">
          {listPrimaryNav.map((item: LinkNav, index: number) => (
            <ButtonNavigation key={`nav-primary-${index}`} href={item.url}>
              {item.text}
            </ButtonNavigation>
          ))}
        </ul>
      </div>

      {/* Navbar2 */}
      <div
        className="bg-black/90 transition-transform px-5 md:px-20 py-3 flex items-center justify-between"
        style={{
          transform:
            scrollPosition > 100
              ? `translateY(-${navbar1Height}px)`
              : "translateY(0)"
        }}
      >
        <Image
          src={"/images/logo/1.png"}
          alt="Logo"
          width={200}
          height={200}
          className="w-32"
        />

        {/* Hamburger button for mobile */}
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <LiaTimesSolid size={24} /> : <HiMiniBars3BottomRight size={24} />}
          </button>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden lg:flex justify-center flex-col items-center">
          <ul className="flex w-full justify-end relative gap-4">
            {listSecondaryNav.map((item: LinkNav, index: number) => (
              <ButtonNavigation
                key={`nav-secondary-${index}`}
                href={item.url}
                className="text-[13px]"
                dataActive={pathNow === item.url ? "true" : "false"}
              >
                {item.text}
              </ButtonNavigation>
            ))}
          </ul>
          {activeLinkDimensions && (
            <hr
              className="fixed h-1 border-none bg-primary mt-1 transition-all duration-200 ease-in-out"
              style={{
                width: activeLinkDimensions.width,
                left: activeLinkDimensions.left,
                top: 40
              }}
            />
          )}
        </div>

        {/* Menu for mobile */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black text-white p-5">
            <ul className="flex flex-col gap-4">
              {listSecondaryNav.map((item: LinkNav, index: number) => (
                <ButtonNavigation
                  key={`nav-mobile-${index}`}
                  href={item.url}
                  className="text-[13px]"
                  dataActive={pathNow === item.url ? "true" : "false"}
                >
                  {item.text}
                </ButtonNavigation>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

type ButtonNavigationType = {
  children: ReactNode;
  href: string;
  className?: string;
  dataActive?: string;
};

function ButtonNavigation({
  children,
  href,
  className = "",
  dataActive
}: ButtonNavigationType) {
  const style = cn(className, "font-bold hover:text-primary");
  return (
    <Link className={style} href={href} data-active={dataActive}>
      {children}
    </Link>
  );
}
