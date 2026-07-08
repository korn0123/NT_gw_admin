"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  product_mapping_id: number;
  merchant_id: string;
  product_code: string;
  product_name: string;
  status: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_mapping_id",
    header: "ID",
  },
  {
    accessorKey: "merchant_id",
    header: "Merchant",
  },
  {
    accessorKey: "product_code",
    header: "Product Code",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          row.original.status
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.status ? "Active" : "Inactive"}
      </span>
    ),
  },
];