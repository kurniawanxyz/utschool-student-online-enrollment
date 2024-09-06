import Image from "next/image";
import { FaTools } from "react-icons/fa";

export default function UnderMaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4 py-10 md:py-20">
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
                <FaTools className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                We&apos;re Working on Something New!
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 max-w-lg md:max-w-xl mx-4">
                Our website is currently under maintenance or development. We are working hard to provide you with the best experience. Please check back later. Thank you for your patience!
            </p>

            {/* Illustration (Optional) */}
            <Image
                src="/images/illustration/1.png" // Ganti dengan ilustrasi yang sesuai
                alt="Under Maintenance"
                width={300}
                height={300}
                className="mb-6 max-w-full h-auto"
            />

            {/* Call to action */}
            <p className="text-sm md:text-base text-gray-500 mx-4">
                For urgent inquiries, please contact us at{" "}
                <a
                    href="mailto:admin@utschool.sch.id"
                    className="text-primary font-semibold underline"
                >
                    admin@utschool.sch.id
                </a>
            </p>

            {/* Optional Footer (Social Media or Branding) */}
            <footer className="mt-12">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} UT School. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
