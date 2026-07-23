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
  <div className="rounded-2xl border border-amber-200 bg-amber-50 shadow-lg overflow-hidden">
    <div className="max-h-[650px] overflow-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead className="z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`                    
                    bg-amber-200
                    border-b border-r border-amber-300
                    px-4 py-3
                    text-left
                    font-semibold
                    whitespace-nowrap

                    ${index === 0 ? "rounded-tl-2xl" : ""}
                    ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-2xl"
                        : ""
                    }
                  `}
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

        <tbody className="bg-white">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="
                  odd:bg-white
                  even:bg-amber-50
                  hover:bg-amber-100
                  transition-colors
                "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="
                      border-b
                      border-r
                      border-amber-200
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
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
                className="py-12 text-center text-gray-500"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}