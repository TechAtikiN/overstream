"use client"

import {
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition
} from "react"
import { updateUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface BioModalProps {
  initialValue: string | null
}

export default function BioModal({ initialValue }: BioModalProps) {
  const [bio, setBio] = useState(initialValue || "")
  const [isPending, startTransition] = useTransition()
  const closeRef = useRef<ElementRef<"button">>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateUser({ bio: bio })
        .then(() => {
          toast.success("User bio updated successfully")
          closeRef.current?.click()
        })
        .catch(() => toast.error("Something went wrong"))
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
            Edit user bio
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Tell us about yourself"
            onChange={(e) => { setBio(e.target.value) }}
            value={bio}
            disabled={isPending}
            className="resize-none"
          />
          <div className="justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              variant={"primary"}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
