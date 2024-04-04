import { redirect } from "next/navigation"
import { getUserByUsername } from "@/lib/auth-service"
import Navbar from "./_components/navbar/Navbar"

interface CreatorLayoutProps {
  params: {
    username: string
  }
  children: React.ReactNode
}

export default async function CreatorLayout({
  params,
  children
}: CreatorLayoutProps) {
  const user = await getUserByUsername(params.username)

  if (!user) {
    redirect("/")
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        {children}
      </div>
    </>
  )
}
