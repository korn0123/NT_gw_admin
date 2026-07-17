"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { User } from "@/types/user"; 

interface UserPageClientProps {
  token: string;
  initialData: User[];
}

export default function UserPageClient({
  token,
  initialData,
}: UserPageClientProps) {
  const [users, setUsers] = useState<User[]>(initialData);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    image: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    id_card: "",
    phone: "",
    address: "",
    role: "client",
    remark: "",
    status: "Active",
  });

  const handleSearch = async () => {
    if (!searchId.trim()) {
        alert("กรุณากรอก ID");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        `/api/user/${searchId}`,
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
        setUsers([]);
        return;
        }

        setUsers([result.data]);
    } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาด");
    } finally {
        setLoading(false);
    }
    };

  const handleReset = () => {
    setSearchId("");
    setUsers(initialData);
  };

  const handleCreate = async () => {
    if (!form.email.trim()) {
      alert("กรุณากรอก Email");
      return;
    }

    if (form.firstname.length < 1) {
      alert("กรุณากรอก Firstname");
      return;
    }

    if (form.id_card.length < 5) {
      alert("ID Card ต้องมีอย่างน้อย 5 ตัวอักษร");
      return;
    }

    if (form.lastname.length < 1) {
      alert("กรุณากรอก Lastname");
      return;
    }

    if (form.password.length < 6) {
      alert("Password ต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (form.phone.length < 9) {
      alert("Phone ต้องมีอย่างน้อย 9 ตัวอักษร");
      return;
    }

    if (form.username.length < 3) {
      alert("Username ต้องมีอย่างน้อย 3 ตัวอักษร");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/user", {
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

      setUsers(prev => [...prev, result.data]);

      setShowCreate(false);

      setForm({
        image: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        id_card: "",
        phone: "",
        address: "",
        role: "client",
        remark: "",
        status: "Active",
        });

    } catch (err) {
      console.error(err);
      alert("Create Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Search ID..."
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

      <DataTable data={users} />
    </div>
  );
}