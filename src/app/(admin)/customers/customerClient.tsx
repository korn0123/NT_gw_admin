"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { Customer } from "@/types/customer"; 

interface CustomersPageClientProps {
  token: string;
  initialData: Customer[];
}

export default function CustomersPageClient({
  token,
  initialData,
}: CustomersPageClientProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialData);
  //const [searchId, setSearchId] = useState("");
  const [esCode, setEsCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!esCode || !customerId) {
        alert("กรุณากรอก ES Code และ Customer ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
            `/api/custommer/${esCode}/${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();

        console.log(result);

        if (!result.success) {
        alert("ไม่พบข้อมูล");
        setCustomers([]);
        return;
        }

        setCustomers([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setEsCode("");
    setCustomerId("");
    setCustomers(initialData);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
    <div className="space-y-4">
      <div className="top-0 z-30 pb-3">
      <div>
        <h1 className="text-3xl font-bold">Customer</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="ES Code"
          value={esCode}
          onChange={(e) => setEsCode(e.target.value)}
          className="w-64 rounded-md border border-gray-300 px-3 py-2"
        />

        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-64 rounded-md border border-gray-300 px-3 py-2"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
      </div>

      <DataTable data={customers} />
    </div>
    </div>
  );
}