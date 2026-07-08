import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";

export default async function ApiLogsPage() {
  const data = await prisma.api_logs.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          API Logs
        </h1>
      </div>

      <DataTable data={data} />
    </div>
  );
}