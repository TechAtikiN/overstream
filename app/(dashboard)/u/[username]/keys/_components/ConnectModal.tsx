"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

export default function ConnectModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"}>
          Generate connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate Connection
          </DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="IngressType" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose>
            <Button variant={"ghost"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => { }}
            variant={"primary"}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
