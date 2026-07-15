import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCustomers } from "@/services/customer.service";  
import CustomersPageClient from "./customerClient";

export default async function CustomersPage() {
  const session = await getServerSession(authOptions);

  const result = await getCustomers(session!.access_token!);

  return (
    <CustomersPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}