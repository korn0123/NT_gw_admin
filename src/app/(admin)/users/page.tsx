import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";

export default async function UsersPage() {
  const data = await prisma.user.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Users
        </h1>
      </div>

      <DataTable data={data} />
    </div>
  );
}