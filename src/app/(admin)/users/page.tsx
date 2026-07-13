import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUsers } from "@/services/user.service";
import UserPageClient from "./userPageClient";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  const result = await getUsers(session!.access_token!);

  return (
    <UserPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}