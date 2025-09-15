"use client";

import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";

import Image from "next/image";

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
      <div className="flex flex-col mt-16 items-center bg-primary w-96 p-10 rounded-xl mx-auto space-y-3">
        <h2 className="font-inclusiveSans text-base text-white">
          password pls:
        </h2>
        <div className="">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="rounded-lg p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit"></button>
        </div>
      </div>
      <Image
        className="w-96 object-fit place-self-center mt-4 selection:rounded-xl border-4 border-primaryLight"
        src="/lewlery.png"
        width={500}
        height={400}
        alt="drawing of olivia"
      />
    </div>
  ) : (
    <AdminNav />
  );
}
