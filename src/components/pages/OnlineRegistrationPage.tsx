import dynamic from "next/dynamic"
import BannerComponent from "../fragments/BannerComponent"
const FormOnlineRegistrationComponent = dynamic(()=>import("../fragments/FormOnlineRegistrationComponent"),{ssr:false})

const OnlineRegistrationPage = () => {
  return (
    <>
      <BannerComponent
        title="Online Registration"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere earum alias hic, accusantium voluptatum minus natus vel. Cupiditate, voluptates autem."
      />
      <FormOnlineRegistrationComponent />
    </>
  )
}

export default OnlineRegistrationPage