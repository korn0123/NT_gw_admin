export async function getProductById(id: number, token: string) {
  const response = await fetch(`/api/product-mapping/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}