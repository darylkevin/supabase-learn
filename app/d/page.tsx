"use client";

import React, { useState } from "react";
import { supabase } from "../utils/supabase";

const Page = () => {
  const [message, setMessage] = useState(null);

  const deleteFromSupabase = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const ipToDelete = formData.get("ip-address") as string;
    const dateToDelete = formData.get("last-request-time") as string;

    const { data, error } = await supabase
      .from("ip_api_usage")
      .delete()
      .eq("ip", ipToDelete)
      .eq("last_request_day", dateToDelete)
      .select(); // Ensure we return the deleted rows

    if (error) {
      console.error("Error deleting row:", error);
      setMessage(JSON.parse(JSON.stringify(error)));
      return;
    }

    if (data && data.length === 0) {
      setMessage("No matching entry found to delete.");
      return;
    }

    console.log("Deleted rows:", data); // Log the deleted rows for debugging
    setMessage(`Successfully deleted entry for IP: ${ipToDelete}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col justify-center align-middle items-center h-[100vh]">
        <form className="flex flex-col" onSubmit={(e) => deleteFromSupabase(e)}>
          <label htmlFor="ip-address">Delete IP</label>
          <input
            className="text-black"
            type="string"
            id="ip-address"
            name="ip-address"
            required
          />
          <label htmlFor="last-request-time">Delete Date</label>
          <input
            className="text-black"
            type="date"
            id="last-request-time"
            name="last-request-time"
            required
          />

          <button
            type="submit"
            className="bg-red-800 hover:bg-red-700 rounded mt-8"
          >
            Delete
          </button>
        </form>

        <span className="p-2 mt-2 text-nowrap">{message && message}</span>
      </div>
    </div>
  );
};

export default Page;
