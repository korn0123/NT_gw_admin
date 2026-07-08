"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData extends Record<string, any>> {
  data: TData[];
  columns?: ColumnDef<TData>[];
}

export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<TData>) {
  const generatedColumns: ColumnDef<TData>[] =
    columns ??
    (data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          accessorKey: key,
          header: key
            .replaceAll("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        }))
      : []);

  const table = useReactTable({
    data,
    columns: generatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-slate-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={generatedColumns.length}
                className="py-8 text-center text-gray-500"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}