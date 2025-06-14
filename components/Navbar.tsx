"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    removeToken();
    router.push("/");
  };

  return (
    <nav className="bg-blue-800 text-white px-4 py-3 flex justify-between">
      <span className="font-bold text-lg">Sparepart Dashboard</span>
      <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer">
        Logout
      </button>
    </nav>
  );
}
