import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/components/ui/data-table";
import { getUsers } from "@/services/user.service"; 

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const result = await getUsers(session!.access_token!);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          User
        </h1>
      </div>

      <DataTable data={result.data} />
    </div>
  );
}