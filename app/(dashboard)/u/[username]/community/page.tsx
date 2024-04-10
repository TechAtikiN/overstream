import { getBlockedUsers } from "@/lib/block-service"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { format } from "date-fns"

export default async function CommunityPage() {
  const blockedUsers = await getBlockedUsers()

  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: format(new Date(user.blocked.createdAt), "dd/MM/yyyy")
  }))

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">
          Community Settings
        </h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  )
}
