import Image from "next/image";

export default function RootLayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  //bg-gradient-to-r from-[rgba(120,119,198,0.3)] to-transparent
  return (
    <div className="flex flex-col md:flex-row py-6 ">
      <div className="order-2  relative w-full md:w-1/2 flex justify-center items-center  ">
        <Image
          src="/login_logout_image.png"
          alt="Login illustration"
          width={800}
          height={800}
          className="w-full rounded-md object-contain p-8"
          priority
        />
        <div className="absolute inset-0 ">
          <div className="flex  p-8 md:p-12">
            <h1 className="bg-white/70 rounded-xl  py-2 text-xl font-bold  md:text-4xl lg:text-4xl text-balance md:mt-8 max-w-2/3 text-center mx-auto">
              Join our community today
            </h1>
          </div>
        </div>
      </div>
      <div className="order-1  w-full md:w-1/2 border-e-1 border-gray-200">{children}</div>
    </div>
  );
}
