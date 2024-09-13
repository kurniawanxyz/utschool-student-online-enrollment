import Image from "next/image";
import BannerComponent from "../fragments/BannerComponent";

export default function RegistrationFlowPage() {
  return (
    <>
      <BannerComponent
        title="Alur Pendaftaran"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere earum alias hic, accusantium voluptatum minus natus vel. Cupiditate, voluptates autem."
      />
      <div className="grid grid-col-1 lg:grid-col-2">
        <Image
          src={"/images/illustration/2.png"}
          alt="Alur Pendaftaran UT School"
          width={300}
          height={300}
          className="mx-auto block"
        />
        <ol>

        </ol>
      </div>
    </>
  )
}
