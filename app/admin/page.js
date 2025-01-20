  "use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import AdminOrders from "../components/AdminOrders";

export default function Home() {
  const [password, setPassword] = useState("");
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (password === "lewlery") {
      setEntered(true);
    }
  }, [password]);

  return !entered ? (
    <div className="">
      <div className="flex flex-col mt-16 items-center bg-primary w-fit p-10 rounded-xl mx-auto space-y-3">
        <h2>password pls:</h2>
        <div className="">
          <input
            type="text"
            id="password"
            name="password"
            placeholder="password"
            className="rounded-lg p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <buttom type="submit"></buttom>
        </div>
      </div>
    </div>
  ) : (
    <AdminOrders />
  );
}
