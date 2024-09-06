import Image from "next/image"

const FooterComponent = () => {
  return (
    <footer className="w-full h-[40vh] bg-black/95 flex flex-col">
      <div className="h-full py-10 px-20 flex">
        <div className="w-1/2">
          <Image
            src={"/images/logo/1.png"}
            alt="Logo UT SCHOOL"
            width={200}
            height={200}
            className="w-44"
          />
          <p className="text-sm w-2/3 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum officiis facilis temporibus, reiciendis doloremque corrupti soluta ullam cumque dolore repudiandae?</p>
        </div>
        <div className="w-1/2 border">

        </div>
      </div>
      <div className="h-[5vh] bg-black shadow">
        <p></p>
      </div>
    </footer>
  )
}

export default FooterComponent