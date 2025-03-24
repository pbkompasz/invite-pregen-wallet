"use client";

import { useState } from "react";
import para from "~/lib/frontend/para";
import "@getpara/react-sdk/styles.css";
import { ParaModal, useAccount, useWallet } from "@getpara/react-sdk";

export default function AdminAuth() {
  const [showParaLogin, setShowParaLogin] = useState(false);

  const { data: account } = useAccount();
  const { data: wallet } = useWallet();

  return (
    <div className="border p-2">
      {account && account.isConnected ? (
        <div className="flex flex-row items-center gap-1">
          <img
            className="relative hidden h-7 h-[15px] w-auto object-contain dark:block"
            src="https://mintlify.s3.us-west-1.amazonaws.com/getpara/logo/dark.svg"
            alt="dark logo"
          ></img>
          <div>
            <p>{account.email ?? account.phone}</p>
            <p className="text-sm">({wallet?.address})</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowParaLogin(true)}
          className="rounded-lg border bg-white px-2"
          style={{ color: "rgb(255, 78, 0)" }}
        >
          Sign in with Para
        </button>
      )}
      <ParaModal
        para={para}
        isOpen={showParaLogin}
        appName="ParaPregenDemo"
        disablePhoneLogin={false}
      />
    </div>
  );
}
