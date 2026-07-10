import { api } from "./api";
import type { Issue } from "@/types/issue"; 

export async function getIssues(token: string) {
  return api<{
    success: boolean;
    data: Issue[];
  }>(
    "/issue/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}