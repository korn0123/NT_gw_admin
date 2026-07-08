import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";

export default async function CustomersPage() {
  const data = await prisma.custommer.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>
      </div>

      <DataTable data={data} />
    </div>
  );
}