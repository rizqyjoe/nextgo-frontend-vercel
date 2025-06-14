"use client";

import { useState } from "react";
import api from "@/utils/api";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/login", { username, password });
      setToken(res.data.token);
      router.push("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-600 p-8 shadow-md rounded w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 border p-2 bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 border p-2 bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} className="bg-gray-800 hover:bg-gray-900 rounded text-white w-full py-2 cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
}
