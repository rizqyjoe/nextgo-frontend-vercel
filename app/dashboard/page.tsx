"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import Navbar from "@/components/Navbar";
import Link from "next/link";

type Sparepart = {
  id: number;
  name: string;
  stock: number;
  unit: string;
  category: string;
};

export default function Dashboard() {
  const [data, setData] = useState<Sparepart[]>([]);

  const loadData = async () => {
    const res = await api.get("/spareparts");
    setData(res.data);
  };

  const deleteSparepart = async (id: number) => {
    if (confirm("Hapus data ini?")) {
      await api.delete(`/spareparts/${id}`);
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Daftar Sparepart</h1>
        <Link
          href="/create"
          className="bg-green-700 rounded text-white px-4 py-2 mb-4 inline-block hover:bg-green-900 transition"
        >
          + Tambah
        </Link>
        <table className="bg-gray-600 text-white w-full border-2 border-solid border-gray-200 mt-2">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Stok</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sp) => (
              <tr key={sp.id}>
                <td className="border p-2">{sp.name}</td>
                <td className="border p-2">{sp.stock}</td>
                <td className="border p-2">{sp.unit}</td>
                <td className="border p-2">{sp.category}</td>
                <td className="border p-2 flex gap-2">
                  <Link
                    href={`/edit/${sp.id}`}
                    className="px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSparepart(sp.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
