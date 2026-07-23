"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { Issue } from "@/types/issue"; 

interface IssuesPageClientProps {
  token: string;
  initialData: Issue[];
}

export default function IssuesPageClient({
  token,
  initialData,
}: IssuesPageClientProps) {
  const [issues, setIssues] = useState<Issue[]>(initialData);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก Issue ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/issue/${searchId}`,
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
        setIssues([]);
        return;
        }

        setIssues([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setIssues(initialData);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
    <div className="space-y-4">
      <div className="top-0 z-30 pb-3">
      <div>
        <h1 className="text-3xl font-bold">Issue</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search Issue ID..."
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

      <DataTable data={issues} />
    </div>
    </div>
  );
}