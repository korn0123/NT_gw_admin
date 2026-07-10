import { api } from "./api";
import type { Customer } from "@/types/customer"; 

export async function getCustomers(token: string) {
  return api<{
    success: boolean;
    data: Customer[];
  }>(
    "/custommer/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}