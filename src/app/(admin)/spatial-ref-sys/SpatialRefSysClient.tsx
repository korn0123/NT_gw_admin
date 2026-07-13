"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { Spatial_ref_sys } from "@/types/spatial-ref-sys"; 

interface SpatialRefSysPageClientProps {
  token: string;
  initialData: Spatial_ref_sys[];
}

export default function SpatialRefSysPageClient({
  token,
  initialData,
}: SpatialRefSysPageClientProps) {
  const [spatialRefSys, setSpatialRefSys] = useState<Spatial_ref_sys[]>(initialData);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก SRID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/spatial-ref-sys/${searchId}`,
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
        setSpatialRefSys([]);
        return;
        }

        setSpatialRefSys([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setSpatialRefSys(initialData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Spatial Reference System</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search SRID..."
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

      <DataTable data={spatialRefSys} />
    </div>
  );
}