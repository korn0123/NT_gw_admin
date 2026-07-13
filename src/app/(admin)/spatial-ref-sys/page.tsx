import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSpatialRefSys } from "@/services/spitial-ref-sys.service"; 
import SpatialRefSysPageClient from "./SpatialRefSysClient";

export default async function SpatialRefSysPage() {
  const session = await getServerSession(authOptions);

  const result = await getSpatialRefSys(session!.access_token!);

  return (
    <SpatialRefSysPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}