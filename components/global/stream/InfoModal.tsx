import { updateStream } from "@/actions/stream"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, ElementRef, FormEvent, useRef, useState, useTransition } from "react"
import { toast } from "sonner"

interface InfoModalProps {
  initialName: string
  initialThumbnailUrl: string | null
}

export default function InfoModal({ initialName, initialThumbnailUrl }: InfoModalProps) {
  const [name, setName] = useState(initialName)
  const [isPending, startTransition] = useTransition()
  const closeRef = useRef<ElementRef<"button">>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated successfully")
          closeRef.current?.click()
        })
        .catch(() => toast.error("Failed to update stream"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size="sm"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Stream Info
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose
              ref={closeRef}
              asChild
            >
              <Button
                type="button"
                variant={"ghost"}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"primary"}
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
