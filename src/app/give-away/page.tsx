"use client";

import { useState } from "react";
import { AdminDashboard } from "~/app/_components/admin";
import Claim from "../_components/claim";
import WarpcastAuth from "../_components/warpcast-auth";
import { AuthKitProvider } from "@farcaster/auth-kit";

const Giveaway = () => {
  const [scenario, setScenario] = useState("give-away");

  const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://localhost:3000/",
  };

  return (
    <>
      <AuthKitProvider config={config}>
        <WarpcastAuth></WarpcastAuth>
        <div className="shadow-xs inline-flex rounded-md" role="group">
          <button
            onClick={() => setScenario("give-away")}
            type="button"
            className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          >
            Give away
          </button>
          <button
            onClick={() => setScenario("claim")}
            type="button"
            className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          >
            Claim
          </button>
        </div>
        {scenario === "give-away" && <AdminDashboard />}
        {scenario === "claim" && <Claim />}
      </AuthKitProvider>
    </>
  );
};

export default Giveaway;
