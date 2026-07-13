import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiLogs } from "@/services/api-log.service"; 
import APILogPageClient from "./apiLogPageClient";

export default async function APILogsPage() {
  const session = await getServerSession(authOptions);

  const result = await getApiLogs(session!.access_token!);

  return (
    <APILogPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}