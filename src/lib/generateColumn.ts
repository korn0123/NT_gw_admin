import { ColumnDef } from "@tanstack/react-table";

function formatHeader(text: string) {
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const hiddenColumns = [
  "__v",
  "request_body",
  "response_body",
];

export function generateColumns<T extends object>(
  data: T[]
): ColumnDef<T>[] {
  if (!data.length) return [];

  return Object.keys(data[0])
    .filter((key) => !hiddenColumns.includes(key))
    .map((key) => ({
      accessorKey: key,
      header: formatHeader(key),
      cell: ({ row }) => {
        const value = row.getValue(key);

        if (value === null || value === undefined) {
          return "-";
        }

        if (typeof value === "boolean") {
          return value ? "True" : "False";
        }

        if (typeof value === "object") {
          return JSON.stringify(value);
        }

        return String(value);
      },
    }));
}