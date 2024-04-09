import { updateStream } from "@/actions/stream"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { ChangeEvent, ElementRef, FormEvent, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import Hint from "../Hint"
import { Trash } from "lucide-react"
import Image from "next/image"

interface InfoModalProps {
  initialName: string
  initialThumbnailUrl: string | null
}

export default function InfoModal({ initialName, initialThumbnailUrl }: InfoModalProps) {
  const router = useRouter()
  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)
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

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed successfully")
          setThumbnailUrl("")
          closeRef.current?.click()
        })
        .catch(() => toast.error("Failed to remove thumbnail"))
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
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xloverflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove Thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF"
                    },
                    allowedContent: {
                      color: "#FFFFFF"
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    closeRef.current?.click()
                  }}
                />
              </div>
            )}
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
