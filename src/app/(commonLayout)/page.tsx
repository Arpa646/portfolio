"use client";
import { useState, useEffect } from "react";
import Home2 from "./components/page/home/Home2";


import { useUser } from "@/services"; // Adjust the path to your store

const Welcome = () => {
  const { token } = useUser();
  // Local state to manage the loading phase
  const [loading, setLoading] = useState(true);

  // Effect to simulate token retrieval and stop showing spinner once the token is available
  useEffect(() => {
    const simulateTokenLoad = setTimeout(() => {
      setLoading(false); // Stop loading once token is retrieved
    }, 1000); // Adjust delay time as needed (1 second is just an example)

    return () => clearTimeout(simulateTokenLoad); // Cleanup timeout if component unmounts
  }, [token]);

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-600 border-r-transparent"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <Home2 />
    </div>
  );
};

export default Welcome;
