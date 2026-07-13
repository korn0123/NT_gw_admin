import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOrderItems } from "@/services/order-item.service"; 
import OrderItemsPageClient from "./orderItemsPageCilent";

export default async function OrderItemsPage() {
  const session = await getServerSession(authOptions);

  const result = await getOrderItems(session!.access_token!);

  return (
    <OrderItemsPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}