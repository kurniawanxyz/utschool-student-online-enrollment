import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google"
import HeaderComponent from "@/components/fragments/HeaderComponent";
import {NavbarComponent} from "@/components/fragments/NavbarComponent";
import FooterComponent from "@/components/fragments/FooterComponent";

const raleway = Raleway({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "UTS | ENROLLMENT",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} bg-slate-100 min-h-[200vh]`}
      >
        <NavbarComponent/>
        <HeaderComponent/>
        <main className="w-full min-h-screen px-20">
          {children}
        </main>
        <FooterComponent/>
      </body>
    </html>
  );
}
