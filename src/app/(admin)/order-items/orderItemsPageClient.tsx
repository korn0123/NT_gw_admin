"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { Order_Item } from "@/types/order-item"; 

interface OrderItemsPageClientProps {
  token: string;
  initialData: Order_Item[];
}

export default function OrderItemsPageClient({
  token,
  initialData,
}: OrderItemsPageClientProps) {
  const [orderItems, setOrderItems] = useState<Order_Item[]>(initialData);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก Item ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/order-items/${searchId}`,
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
        setOrderItems([]);
        return;
        }

        setOrderItems([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setOrderItems(initialData);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
    <div className="space-y-4">
      <div className="top-0 z-30 pb-3 space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Order Item</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search Item ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
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

      <DataTable data={orderItems} />
    </div>
    </div>
  );
}