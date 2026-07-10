import { api } from "./api";
import type { Api_log } from "@/types/api-log"; 

export async function getApiLogs(token: string) {
  return api<{
    success: boolean;
    data: Api_log[];
  }>(
    "/api-logs/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}