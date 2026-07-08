import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function ProductsPage() {
  const data = await prisma.product_mapping.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Product Mapping
        </h1>
      </div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}