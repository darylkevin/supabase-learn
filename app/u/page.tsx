"use client";

import React, { useState } from "react";
import { supabase } from "../utils/supabase";

const Page = () => {
  const [message, setMessage] = useState(null);

  const updateToSupabase = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const ip = formData.get("ip-address") as string;
    const totalChars = formData.get("total-chars") as number;
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("ip_api_usage")
      .update([
        {
          total_chars: totalChars,
          updated: lastUpdated,
        },
      ])
      .eq("ip", ip)
      .select();

    if (error) {
      console.error(error);
      setMessage("Failed to update: " + error.message);
      return;
    }

    if (data.length === 0) {
      setMessage("No matching entry found to update.");
      return;
    }

    setMessage("Successfully updated");
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col justify-center align-middle items-center h-[100vh]">
        <form className="flex flex-col" onSubmit={(e) => updateToSupabase(e)}>
          <label htmlFor="ip-address">For IP</label>
          <input
            className="text-black"
            type="string"
            id="ip-address"
            name="ip-address"
            required
          />
          <label htmlFor="total-chars">New Total Chars</label>
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
            Update
          </button>
        </form>

        <span className="p-2 mt-2 text-nowrap">{message && message}</span>
      </div>
    </div>
  );
};

export default Page;
