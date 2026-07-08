const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(
  endpoint: string,
  options?: RequestInit,
  token?: string
): Promise<T> {
  const clientToken =
    token ??
    (typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(clientToken && {
        Authorization: `Bearer ${clientToken}`,
      }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}