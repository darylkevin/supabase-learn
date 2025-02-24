"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Page = () => {
  const [message, setMessage] = useState(null);
  const [clientIP, setClientIP] = useState(null);

  // Fetch IP from the Next.js API route
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("/api"); // Call your Next.js API route
        const data = await res.json();
        setClientIP(data.ip); // Extract and set the client's IP address
      } catch (error) {
        console.error("Failed to fetch IP:", error);
        setClientIP(null);
      }
    };
    fetchIp();
  }, []);

  const addToSupabase = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const ip = formData.get("ip-address") as string;
    const totalChars = formData.get("total-chars") as number;
    const lastRequestDay = new Date().toISOString().split("T")[0];
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("ip_api_usage")
      .insert([
        {
          ip: ip,
          total_chars: totalChars,
          last_request_day: lastRequestDay,
          updated: lastUpdated,
        },
      ])
      .select();

    if (data) {
      setMessage("Successfully created");
    }

    if (error) {
      console.error(error);
      setMessage("Failed to create: " + error.message);
      return;
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col justify-center align-middle items-center h-[100vh]">
        <span>Your IP: {clientIP}</span>
        <form className="flex flex-col" onSubmit={(e) => addToSupabase(e)}>
          <label htmlFor="ip-address">IP</label>
          <input
            className="text-black"
            type="string"
            id="ip-address"
            name="ip-address"
            required
          />
          <label htmlFor="total-chars">Total Chars</label>
          <input
            className="text-black"
            type="number"
            id="total-chars"
            name="total-chars"
            required
          />

          <button
            type="submit"
            className="bg-red-800 hover:bg-red-700 rounded mt-8"
          >
            Create
          </button>
        </form>

        <span className="p-2 mt-2 text-nowrap">{message && message}</span>
      </div>
    </div>
  );
};

export default Page;
