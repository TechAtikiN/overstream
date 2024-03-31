'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = async (search: string) => {
    if (!search) return
    console.log(`${window.location.href}?search=${search}`)
    router.replace(`${window.location.href}?search=${search}`)
    // }
  }

  return (
    <div className="relative w-full lg:w-[400px] flex items-center">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button
        onClick={() => handleSearch(search)}
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon size={24} />
      </Button>
    </div>
  )
}
