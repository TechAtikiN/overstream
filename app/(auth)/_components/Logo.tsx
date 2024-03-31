import Image from "next/image";
export const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="bg-white rounded-full flex flex-col justify-center h-36 w-36 p-8">
        <Image
          className="rounded-full scale-125"
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
      <p className="font-bold text-3xl">overstream</p>
      <p className="text-sm text-gray-300">Connect. Stream. Together.</p>
    </div>
  )
}