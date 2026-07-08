import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/services/product.service";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const result = await getProducts(session!.access_token!);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Product Mapping
        </h1>
      </div>

      <DataTable data={result.data} />
    </div>
  );
}