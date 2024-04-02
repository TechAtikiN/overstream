'use client'

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";

export default function SearchInput() {
  const [search, setSearch] = useState('')
  const { replace } = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onClear = () => {
    setSearch("")
  }

  const handleSearch = async (search: string) => {
    const params = new URLSearchParams(searchParams);
    search ? params.set('term', search) : params.delete('term');
    const url = `${pathname}search?${params.toString()}`;
    replace(url);
  }

  return (
    <div className="relative w-full lg:w-[400px] flex items-center">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        defaultValue={searchParams.get('term')?.toString()}
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {search && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />)}
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
