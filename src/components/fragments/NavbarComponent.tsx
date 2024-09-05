"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';


type LinkNav = {
  text: string,
  url: string
}

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbar1Height, setNavbar1Height] = useState(0);
  const navbar1Ref = useRef<HTMLDivElement | null>(null);



  const listPrimaryNav: LinkNav[] = [
    {
      text: "Beranda",
      url : "/"
    },
    {
      text: "Tentang Kami",
      url : "/"
    },
    {
      text: "Hubungi Kami",
      url : "/"
    }
  ]

  // UseEffect to handle scroll event and update height
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update scroll position
    };

    // Update navbar1Height after the component mounts
    if (navbar1Ref.current) {
      setNavbar1Height(navbar1Ref.current.offsetHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup
    };
  }, []); // Only run once on mount

  console.log(navbar1Height)

  return (
    <nav className='fixed z-10 top-0 w-full'>
      {/* Navbar1 */}
      <div
        ref={navbar1Ref}
        className={`bg-black/90 transition-transform py-5 flex  items-center justify-between px-5`}
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
          {
            listPrimaryNav.map((item:LinkNav,index:number)=>(
              <ButtonNavigation key={`nav-primary-${index}`} href={item.url}>{item.text}</ButtonNavigation>
            ))
          }
        </ul>
      </div>

      {/* Navbar2 */}
      <div
        className={`bg-black/90 transition-transform`}
        style={{
          transform: scrollPosition > 100 ? `translateY(-${navbar1Height}px)` : 'translateY(0)',
        }}
      >
        <p>TNavbar2</p>
      </div>
    </nav>
  );
};




type ButtonNavigationType = {
  children: ReactNode,
  href: string
}

function ButtonNavigation({
  children,
  href
}:ButtonNavigationType) {
  return (
    <Link className='font-bold hover:text-primary' href={href}>{children}</Link>
  )
}

export default Navbar;
