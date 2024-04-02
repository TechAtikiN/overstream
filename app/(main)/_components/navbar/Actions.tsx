import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Clapperboard } from "lucide-react"
import Link from "next/link"

export default async function Actions() {
  const user = await currentUser()

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size={"sm"} variant={"primary"}>Login</Button>
        </SignInButton>
      )}

      {user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant={"ghost"}
            className="text-muted-foreground hover"
          >
            <Link className="flex items-center justify-center" href={`/u/${user?.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <p className="hidden lg:block mt-1">Dashboard</p>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  )
}
