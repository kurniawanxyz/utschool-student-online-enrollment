"use client";
import dynamic from "next/dynamic";
import BannerComponent from "../fragments/BannerComponent";
const FormOnlineRegistrationComponent = dynamic(
  () => import("../fragments/FormOnlineRegistrationComponent"),
  { ssr: false }
);

const OnlineRegistrationPage = () => {
  return (
    <>
      <BannerComponent
        title="Online Registration"
        description="Ikuti langkah langkah dan ketentuan berikut untuk melakukan pendaftaran"
      />

      <FormOnlineRegistrationComponent />
    </>
  );
};

export default OnlineRegistrationPage;
