import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface HintLabelProps {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

export default function HintLabel({
  label,
  children,
  asChild,
  side,
  align
}: HintLabelProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
