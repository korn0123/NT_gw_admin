import { api } from "./api";
import type { Product } from "@/types/product";

export async function getProducts(token: string) {
  return api<{
    success: boolean;
    data: Product[];
  }>(
    "/product-mapping/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}
