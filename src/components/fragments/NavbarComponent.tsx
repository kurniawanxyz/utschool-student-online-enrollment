"use client"
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

type LinkNav = {
  text: string,
  url: string
}

const listPrimaryNav: LinkNav[] = [
  { text: "Beranda", url: "/" },
  { text: "Tentang Kami", url: "/" },
  { text: "Hubungi Kami", url: "/" }
];

const listSecondaryNav: LinkNav[] = [
  { text: "Registration Flow", url: "/" },
  { text: "Selection Schedule", url: "/selection-schedule" },
  { text: "Registration Requirement", url: "/registration-requirement" },
  { text: "Online Registration", url: "/online-registration" },
  { text: "Announcement Selection", url: "/announcement-selection" },
];

export function NavbarComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbar1Height, setNavbar1Height] = useState(0);
  const [activeLinkDimensions, setActiveLinkDimensions] = useState<{ width: number; left: number } | null>(null);
  
  const navbar1Ref = useRef<HTMLDivElement | null>(null);
  const pathNow = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    if (navbar1Ref.current) {
      setNavbar1Height(navbar1Ref.current.offsetHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Timeout to ensure DOM is fully updated
    const timer = setTimeout(() => {
      const activeLink = document.querySelector('[data-active="true"]') as HTMLElement;
      if (activeLink) {
        const { width, left } = activeLink.getBoundingClientRect();
        setActiveLinkDimensions({ width, left });
      } else {
        console.log('No active link found');
      }
    }, 100); // Adjust timeout as needed

    return () => clearTimeout(timer);
  }, [pathNow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navbar1Ref.current) {
        setNavbar1Height(navbar1Ref.current.offsetHeight);
      }
    }, 100); // Timeout untuk memastikan semuanya sudah dimuat dengan benar
    
    return () => clearTimeout(timer);
  }, []);
  

  console.log('Navbar1 Height:', navbar1Height);
  console.log('Active Link Dimensions:', activeLinkDimensions);

  return (
    <nav className='fixed z-10 top-0 w-full'>
      {/* Navbar1 */}
      <div
        ref={navbar1Ref}
        className={`bg-black/90 transition-transform py-5 flex items-center justify-between px-20`}
        style={{
          transform: scrollPosition > 100 ? `translateY(-${navbar1Height}px)` : 'translateY(0)',
        }}
      >
        <Image
          src={'/images/logo/1.png'}
          alt='Logo'
          width={200}
          height={200}
          className='w-40'
        />
        <ul className='flex gap-3'>
          {listPrimaryNav.map((item: LinkNav, index: number) => (
            <ButtonNavigation key={`nav-primary-${index}`} href={item.url}>{item.text}</ButtonNavigation>
          ))}
        </ul>
      </div>

      {/* Navbar2 */}
      <div
        className={`bg-black/90 transition-transform px-20 pt-5`}
        style={{
          transform: scrollPosition > 100 ? `translateY(-${navbar1Height}px)` : 'translateY(0)',
        }}
      >
        <ul className='flex w-full justify-between relative'>
          {listSecondaryNav.map((item: LinkNav, index: number) => (
            <ButtonNavigation
              key={`nav-secondary-${index}`}
              href={item.url}
              dataActive={pathNow === item.url ? 'true' : 'false'}
            >
              {item.text}
            </ButtonNavigation>
          ))}
        </ul>
        {activeLinkDimensions && (
          <hr
            className='sticky h-1 border-none bg-primary mt-1 transition-all duration-200 ease-in-out'
            style={{
              width: activeLinkDimensions.width,
              left: activeLinkDimensions.left,
            }}
          />
        )}
      </div>
    </nav>
  );
};

type ButtonNavigationType = {
  children: ReactNode,
  href: string,
  className?: string,
  dataActive?: string
}

function ButtonNavigation({
  children,
  href,
  className = "",
  dataActive
}: ButtonNavigationType) {
  const style = cn(className, 'font-bold hover:text-primary');
  return (
    <Link className={style} href={href} data-active={dataActive}>
      {children}
    </Link>
  );
}
