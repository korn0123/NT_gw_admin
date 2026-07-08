import { api } from "./api";

// services/auth.service.ts

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  access_token: string;
  user: {
    id: number;
    username: string;
    role: string;
    status: string;
  };
}

export async function login(
  username: string,
  password: string
) {
  return api("/sso/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}