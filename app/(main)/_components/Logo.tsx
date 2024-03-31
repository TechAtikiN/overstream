import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <div className='flex space-x-2 justify-start items-center'>
        <div className="bg-white rounded-full flex flex-col justify-center p-2">
          <Image
            className="rounded-full scale-125"
            src="/logo.png"
            alt="Logo"
            width={25}
            height={25}
          />
        </div>
        <p className='font-semibold text-lg'>overstream</p>
      </div>
    </Link>
  )
}
