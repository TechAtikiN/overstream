import { getUser } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import URLCard from "./_components/URLCard";
import KeyCard from "./_components/KeyCard";
import ConnectModal from "./_components/ConnectModal";

export default async function KeysPage() {
  const user = await getUser();
  const stream = await getStreamByUserId(user.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  )
}
