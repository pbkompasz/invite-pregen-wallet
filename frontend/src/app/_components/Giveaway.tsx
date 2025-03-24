"use client";

import { AdminDashboard } from "~/app/_components/Admin";
import { AuthKitProvider } from "@farcaster/auth-kit";
import Header from "../_components/Header";

const Giveaway = () => {
  const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://localhost:3000/",
  };

  return (
    <>
      <AuthKitProvider config={config}>
        <Header />
        <AdminDashboard />
      </AuthKitProvider>
    </>
  );
};

export default Giveaway;
