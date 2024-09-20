import cn from "@/utils/cn";
import Image from "next/image"
import Link from "next/link";
import { ReactNode } from "react";
import ButtonFooterComponent from "../elements/ButtonFooterComponent";
type LinkNav = {
  text: string;
  url: string;
};

const listSitemap: LinkNav[] = [
  {
    text: "Beranda",
    url: "#"
  },
  {
    text: "Tentang",
    url: "#"
  },
  {
    text: "Aktifitas & Berita",
    url: "#"
  },
  {
    text: "Tentang",
    url: "#"
  },
  {
    text: "Alumni",
    url: "#"
  },
  {
    text: "Training Program",
    url: "#"
  },
  {
    text: "Patner Industri",
    url: "#"
  },
]
const listHelp: LinkNav[] = [
  {
    text: "Dukungan Pelanggan",
    url: "#"
  },
  {
    text: "Syarat & Ketentuan",
    url: "#"
  },
  {
    text: "Kebijakan privasi",
    url: "#"
  },
]

const FooterComponent = () => {
  return (
    <div className="relative">
      <ButtonFooterComponent/>  
      <footer className="w-full bg-black/95 flex flex-col">
        <div className="h-full py-10 px-6 md:px-20 flex flex-col md:flex-row">
          {/* Logo dan Deskripsi */}
          <div className="md:w-2/4 w-full mb-6 md:mb-0">
            <Image
              src={"/images/logo/1.png"}
              alt="Logo UT SCHOOL"
              width={200}
              height={200}
              className="w-32 md:w-44"
            />
            <p className="text-sm mt-2 w-full md:w-2/3 text-gray-300">
            UT School determined to be the best educational institution for Operators and Mechanics of heavy equipment in the world. With complete facilities and instructors are competent and experienced, we are ready to educate and produce qualified human resources, professional and international perspective.
            </p>
          </div>

          {/* Links dan Informasi Kontak */}
          <div className="md:w-2/4 w-full flex flex-col md:flex-row justify-center gap-8">
            {/* Bagian Situs Web */}
            {/* <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-white">Situs Web</h2>
              <ul className="text-sm flex flex-col gap-1 text-gray-400">
                {listSitemap.map((item: LinkNav, index) => (
                  <li key={`sitemap-${index}`}>
                    <ButtonNavigation href={item.url}>{item.text}</ButtonNavigation>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Bagian Bantuan */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-white">Bantuan</h2>
              <ul className="text-sm flex flex-col gap-1 text-gray-400">
                {listHelp.map((item: LinkNav, index) => (
                  <li key={`sitemap-${index}`}>
                    <ButtonNavigation href={item.url}>{item.text}</ButtonNavigation>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bagian Hubungi Kami */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-white">Hubungi Kami</h2>
              {/* <h3 className="text-lg font-semibold mb-1 text-white">UTSCHOOL</h3> */}
              <p className="text-[10px] leading-relaxed text-gray-400">
                Jl. Raya Bekasi KM. 22<br />
                Jakarta Timur 13910, Indonesia<br />
                <strong>Jam Kerja:</strong> Senin - Jumat (07:30 WIB s/d 16:30 WIB)<br />
                <strong>Call Center:</strong> 0811 1084 80
              </p>
            </div>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="h-[5vh] bg-black shadow"></div>
      </footer>
    </div>
  );
};



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
  const style = cn(className, "font-medium hover:text-primary");
  return (
    <Link className={style} href={href} data-active={dataActive}>
      {children}
    </Link>
  );
}


export default FooterComponent