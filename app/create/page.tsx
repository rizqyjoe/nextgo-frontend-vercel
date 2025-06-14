"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    stock: 0,
    unit: "",
    category: "",
  });

  const handleSubmit = async () => {
    await api.post("/spareparts", form);
    router.push("/dashboard");
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Tambah Sparepart</h1>

        <input
          type="text"
          placeholder="Nama"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stok"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Unit"
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />
        <select
          className="border rounded p-2 w-full mb-3 bg-white text-black"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Pilih Kategori
          </option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Chemical">Chemical</option>
        </select>
        
        <button
          onClick={handleSubmit}
          className="bg-blue-600 rounded text-white w-full py-2 hover:bg-blue-800 transition cursor-pointer mb-3"
        >
          Simpan
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
