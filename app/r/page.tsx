"use client";

import React, { useState } from "react";
import { supabase } from "../utils/supabase";

const Page = () => {
  const [result, setResult] = useState(null);

  const getFromSupabase = async () => {
    const { data, error } = await supabase.from("ip_api_usage").select("*");

    if (data) {
      setResult(JSON.parse(JSON.stringify(data)));
      return;
    }

    if (error) {
      setResult(JSON.parse(JSON.stringify(error)));
      return;
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center align-middle flex-col">
      <button
        onClick={getFromSupabase}
        className="bg-red-800 hover:bg-red-700 rounded p-2"
      >
        Get from Supabase
      </button>

      <div className="mt-4">
        {result &&
          result.map((res, i) => (
            <div key={i} className="flex gap-12">
              <span>{res.ip}</span>
              <span>{res.total_chars}</span>
              <span>{res.last_request_day}</span>
              <span>{res.updated}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
