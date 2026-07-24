"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { Api_log } from "@/types/api-log"; 

interface APILogPageClientProps {
  token: string;
  initialData: Api_log[];
}

export default function APILogPageClient({
  token,
  initialData,
}: APILogPageClientProps) {
  const [apiLogs, setAPILogs] = useState<Api_log[]>(initialData);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก Log ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/api-logs/${searchId}`,
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
        setAPILogs([]);
        return;
        }

        setAPILogs([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setAPILogs(initialData);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
    <div className="space-y-4">
      <div className="top-0 z-30 pb-3 space-y-4">
      <div>
        <h1 className="text-3xl font-bold">API Log</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search Log ID..."
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

      <DataTable data={apiLogs} />
    </div>
    </div>
  );
}