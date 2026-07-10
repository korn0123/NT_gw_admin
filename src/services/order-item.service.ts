import { api } from "./api";
import type { Order_Item } from "@/types/order-item";

export async function getOrderItems(token: string) {
  return api<{
    success: boolean;
    data: Order_Item[];
  }>(
    "/order-items/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}