import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/ui/data-table";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product-mapping/`,
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

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