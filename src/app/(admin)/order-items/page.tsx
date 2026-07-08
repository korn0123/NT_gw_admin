import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";

export default async function OrderItemsPage() {
  const data = await prisma.order_items.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Order Items
        </h1>
      </div>

      <DataTable data={data} />
    </div>
  );
}