import { api } from "./api";
import type { Spatial_ref_sys } from "@/types/spatial-ref-sys";

export async function getSpatialRefSys(token: string) {
  return api<{
    success: boolean;
    data: Spatial_ref_sys[];
  }>(
    "/spatial-ref-sys/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}