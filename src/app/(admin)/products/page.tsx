import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProducts } from "@/services/product.service";
import ProductPageClient from "./productPageCilent";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  const result = await getProducts(session!.access_token!);

  return (
    <ProductPageClient
      token={session!.access_token!}
      initialData={result.data}
    />
  );
}