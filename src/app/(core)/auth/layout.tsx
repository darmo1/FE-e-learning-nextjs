import Image from "next/image";


export default function RootLayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>


    <div className="flex">
      <div className="relative w-full md:w-1/2">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Beautiful landscape"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(120,119,198,0.3)] to-transparent">
          <div className="flex h-full items-center p-8 md:p-12">
            <h1 className="text-3xl font-bold  md:text-4xl lg:text-5xl text-balance max-w-2/3 text-center mx-auto">
              Join our community today
            </h1>
          </div>
        </div>
      </div>
      <div className="w-1/2">{children}</div>
    </div>

    </>
  );
}
