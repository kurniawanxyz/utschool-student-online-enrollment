import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import HeaderComponent from "@/components/fragments/HeaderComponent";
import { NavbarComponent } from "@/components/fragments/NavbarComponent";
import FooterComponent from "@/components/fragments/FooterComponent";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const raleway = Raleway({
  subsets: ["latin"],
});

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WJSN37P7');`,
          }}
        />
      </head>
      <body className={`${raleway.className} bg-slate-100 min-h-[200vh]`}>
      {/* Google Tag Manager (noscript) */}
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJSN37P7"
height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
{/* End Google Tag Manager (noscript) */}
        <NavbarComponent />
        <HeaderComponent />
        <main className="w-full min-h-screen px-5 md:px-20">{children}</main>
        <FooterComponent />
        <Analytics />
        <SpeedInsights />
        <ToastContainer
          newestOnTop
          position="top-right"
          className="z-[10000]"
        />
      </body>
    </html>
  );
}
