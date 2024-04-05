"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";

interface CopyButtonProps {
  value?: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = () => {
    if (!value) return

    setIsCopied(true)
    navigator.clipboard.writeText(value)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const Icon = isCopied ? CheckCheck : Copy

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant={"ghost"}
      size={"sm"}
    >
      <Icon className="w-4 h-4" />
    </Button>
  )
}
