"use client"

import { useUser } from "@clerk/nextjs"
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import NavItem, { NavItemSkeleton } from "./NavItem"

export default function Navigation() {
  const pathname = usePathname()
  const { user } = useUser()

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users
    },
  ]

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col space-y-3 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  )
}
