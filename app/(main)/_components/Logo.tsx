import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <div className='flex space-x-2 justify-start items-center'>
        <div className="bg-white mr-12 lg:mr-0 lg:shrink shrink-0 rounded-full p-2">
          <Image
            className="rounded-full"
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
          />
        </div>
        <p className='font-semibold text-lg hidden lg:flex'>overstream</p>
      </div>
    </Link>
  )
}
