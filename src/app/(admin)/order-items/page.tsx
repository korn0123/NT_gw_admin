import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/ui/data-table";
import { getOrderItems } from "@/services/order-item.service"; 

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const result = await getOrderItems(session!.access_token!);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Order Items
        </h1>
      </div>

      <DataTable data={result.data} />
    </div>
  );
}