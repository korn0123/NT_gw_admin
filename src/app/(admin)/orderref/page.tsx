import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SearchOrderRefClient from "./SearchOrderRefClient";

export default async function SearchOrderRefPage() {
  const session = await getServerSession(authOptions);

  return (
    <SearchOrderRefClient
      token={session!.access_token!}
    />
  );
}