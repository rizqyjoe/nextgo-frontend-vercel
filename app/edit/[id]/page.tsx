"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    stock: 0,
    unit: "",
    category: "",
  });

  useEffect(() => {
    api.get(`/spareparts/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleSubmit = async () => {
    await api.put(`/spareparts/${id}`, form);
    router.push("/dashboard");
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Edit Sparepart</h1>
        <input
          type="text"
          placeholder="Nama"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stok"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Unit"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kategori"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 rounded text-white w-full py-2 hover:bg-blue-800 transition cursor-pointer mb-3"
        >
          Update
        </button>
        <Link
          href="/dashboard"
          className="block text-center bg-gray-500 hover:bg-gray-700 text-white rounded w-full py-2 transition"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
