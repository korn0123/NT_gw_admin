"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Product } from "@/types/product";

interface ProductPageClientProps {
  token: string;
  initialData: Product[];
}

export default function ProductPageClient({
  token,
  initialData,
}: ProductPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [editing, setEditing] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    es_code: "INNS1xxxx",
    product_name: "ชื่อโครงการ",
    hana_account_code: "4410xxx",
    hana_product_code: "2090xxxx",
    hana_sub_product_code: "xx",
    hana_revenue_type: "x",
    ecc_account_code: "5041xxxx",
    ecc_account_name: "รายได้บริการด้านนวัตกรรม",
    ecc_product_code: "G0xxx",
    ecc_product_name: "บริการด้านวิจัยและนวัตกรรม",
    channel_product_code: "SPC6xxx",
    channel_service_code: "SVC5xxx",
    message_url: "https://xxxx.ntplc.co.th/api_support/xxxx_message/",
    bank_url: "https://xxxx.ntplc.co.th/api_support/xxxx_bank_response/",
    inno_sub1: "1",
    inno_sub2: "1",
  });

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก Product ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/product-mapping/${searchId}`,
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
        setProducts([]);
        return;
        }

        setProducts([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setProducts(initialData);
  };

  const handleCreate = async () => {
    if (!form.es_code.trim()) {
      alert("กรุณากรอก ES Code");
      return;
    }

    if (!form.channel_service_code.trim()) {
      alert("กรุณากรอก Channel Service Code");
      return;
    }

    if (!form.product_name.trim()) {
      alert("กรุณากรอก Product Name");
      return;
    }

    if (!window.confirm("Confirm create this product?")) {
        return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/product-mapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message ?? "Create Failed");
        return;
      }

      alert("Create Success");

      setProducts(prev => [...prev, result.data]);

      setShowCreate(false);

      setForm({
        es_code: "INNS1xxxx",
        product_name: "ชื่อโครงการ",
        hana_account_code: "4410xxx",
        hana_product_code: "2090xxxx",
        hana_sub_product_code: "xx",
        hana_revenue_type: "x",
        ecc_account_code: "5041xxxx",
        ecc_account_name: "รายได้บริการด้านนวัตกรรม",
        ecc_product_code: "G0xxx",
        ecc_product_name: "บริการด้านวิจัยและนวัตกรรม",
        channel_product_code: "SPC6xxx",
        channel_service_code: "SVC5xxx",
        message_url: "https://xxxx.ntplc.co.th/api_support/xxxx_message/",
        bank_url: "https://xxxx.ntplc.co.th/api_support/xxxx_bank_response/",
        inno_sub1: "1",
        inno_sub2: "1",
      });

    } catch (err) {
      console.error(err);
      alert("Create Failed");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (product: Product) => {
    setEditing(product);

    // copy ข้อมูลเดิมทั้งหมดมาใส่ form
    setEditForm({ ...product });
  };

  const handleEdit = async () => {
    if (!editing) return;

    if (!window.confirm("Confirm update this product?")) {
        return;
    }

    const {
      id,
      product_token,
      add_time,
      modify_time,
      ...body
    } = editForm;

    try {
        const response = await fetch(
            `/api/product-mapping/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        setProducts((prev) =>
            prev.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      ...body,
                    }
                : item
            )
        );

        setEditing(null);

        alert("Update Success");
    } catch {
        alert("Update Failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) {
        return;
    }

    try {
        const response = await fetch(
            `/api/product-mapping/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            alert("Delete Failed");
            return;
        }

        setProducts((prev) =>
            prev.filter((item) => item.id !== id)
        );

        alert("Delete Success");
    } catch {
        alert("Delete Failed");
    }
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => {
        if (products.length === 0) return [];

        const defaultColumns = Object.keys(products[0]).map(
            (key) => ({
                accessorKey: key,
                header: key
                .replaceAll("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            })
        );

        return [
            ...defaultColumns,

            {
                id: "actions",

                header: "Actions",

                cell: ({ row }) => (
                    <div className="flex gap-2">

                        <button
                            className="rounded bg-blue-600 px-3 py-1 text-white"
                            onClick={() =>
                                openEdit(row.original)
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="rounded bg-red-600 px-3 py-1 text-white"
                            onClick={() =>
                                handleDelete(row.original.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ),
            },
        ];
    },
    [products]
  );

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
    <div className="space-y-4">
      <div className="top-0 z-30 pb-3">
      <div>
        <h1 className="text-3xl font-bold">Product Mapping</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search Product ID..."
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

        <button
          onClick={() => setShowCreate(true)}
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Create
        </button>
      </div>
      </div>
      

      {
      showCreate && (
      <div className="rounded-lg border p-6 space-y-3">

        <h2 className="text-xl font-bold">
          Create Product
        </h2>

        {
          Object.entries(form).map(([key,value]) => (

          <div key={key}>

            <label className="block text-sm font-medium">
                {key}
            </label>

            <input
                className="w-full rounded border px-3 py-2"
                value={value}
                onChange={(e)=>
                    setForm(prev=>({
                        ...prev,
                        [key]:e.target.value
                    }))
                }
            />

          </div>

          ))
        }

        <div className="flex gap-3">

          <button
              onClick={handleCreate}
              className="rounded bg-blue-600 px-4 py-2 text-white"
          >
              Save
          </button>

          <button
              onClick={()=>setShowCreate(false)}
              className="rounded bg-gray-500 px-4 py-2 text-white"
          >
              Cancel
          </button>

        </div>

      </div>
    )}

    {
    editing && (

    <div className="rounded-lg border p-6 space-y-3">

    <h2 className="text-xl font-bold">
      Edit Product
    </h2>

    {
      Object.entries(editForm)

      .filter(
        ([key]) =>
          ![
            "id",
            "product_token",
            "add_time",
            "modify_time",
          ].includes(key)
      )

      .map(([key,value])=>(

    <div key={key}>

    <label>
    {key}
    </label>

    <input
      className="w-full rounded border px-3 py-2"

      value={String(value ?? "")}

      onChange={(e)=>
      setEditForm((prev: Product) => ({
        ...prev,
        [key]: e.target.value,
      }))
    }
    />

    </div>

    ))
  }

  <div className="flex gap-3">

    <button
      className="rounded bg-blue-600 px-4 py-2 text-white"
      onClick={handleEdit}
    >
      Save
    </button>

    <button
      className="rounded bg-gray-500 px-4 py-2 text-white"
      onClick={()=>setEditing(null)}
    >
      Cancel
    </button>

    </div>

    </div>

  )}

      <DataTable
        data={products}
        columns={columns}
      />
    </div>
    </div>
  );
}