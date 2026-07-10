import { api } from "./api";
import type { User } from "@/types/user";

export async function getUsers(token: string) {
  return api<{
    success: boolean;
    data: User[];
  }>(
    "/user/",
    {
      method: "GET",
      cache: "no-store",
    },
    token
  );
}