import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getIssues } from "@/services/issue.service"; 
import IssuesPageClient from "./issueClient";

export default async function IssuesPage() {
  const session = await getServerSession(authOptions);

  const result = await getIssues(session!.access_token!);

  return (
    <IssuesPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}