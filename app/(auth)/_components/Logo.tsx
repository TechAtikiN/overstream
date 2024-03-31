import Image from "next/image";
export const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="bg-white rounded-full flex flex-col justify-center h-36 w-36 p-4">
        <Image
          className="rounded-full scale-125"
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>
      <p>Connect. Stream. Together.</p>
    </div>
  )
}