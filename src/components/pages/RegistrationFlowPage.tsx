import Image from "next/image";
import BannerComponent from "../fragments/BannerComponent";
import Link from "next/link";

export default function RegistrationFlowPage() {
  return (
    <>
      <BannerComponent
        title="Alur Pendaftaran"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere earum alias hic, accusantium voluptatum minus natus vel. Cupiditate, voluptates autem."
      />
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="bg-white shadow rounded p-5">
          <h2 className="text-black text-xl font-bold">Ketarangan</h2>
          <ol className="text-black text-md mt-3 ms-5 list-decimal list-outside space-y-2">
            <li>Jadwal/periode pendaftaran dapat dilihat melalui web site UT School.</li>
            <li>Pendaftaran online dapat dilakukan <Link className="bg-primary px-3 py-1 rounded hover:bg-primary/80" href={"/online-registration"}>Disini!!</Link></li>
            <li>
              Pada saat seleksi administrasi, Pendaftar harus membawa berkas-berkas:
              <ol className="list-disc ms-5 text-sm mt-3">
                <li>Formulir pendaftaran yang telah diisi lengkap ( print out formulir online )</li>
                <li>Foto copy kartu identitas (KTP/SIM)</li>
                <li>Foto copy ijazah (bagi Pendaftar yang sudah dinyatakan lulus SLTA/ Sederajat)</li>
                <li>Foto copy rapor kelas III</li>
              </ol>
            </li>
            <li>
              Tes kesehatan dilakukan di Laboratorium yang telah ditunjuk oleh pihak UTS, Persyaratan mengikuti tes kesehatan yaitu :
              <ol className="list-disc ms-5 text-sm mt-3">
                <li>Peserta membawa print out formulir online</li>
                <li>Peserta diwajibkan puasa sebelum mengikuti tes ( Minimum 10 jam )</li>
              </ol>
            </li>
          </ol>
        </div>
        <div className="bg-white shadow rounded p-5">
          <Image
            src={"/images/illustration/2.png"}
            alt="Alur Pendaftaran UT School"
            width={300}
            height={300}
            className="mx-auto block"
          />
        </div>
      </div>
    </>
  )
}
