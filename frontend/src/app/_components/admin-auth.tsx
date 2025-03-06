"use client";

import { useState } from "react";
import para from "~/clients/para";
import "@getpara/react-sdk/styles.css";
import { ParaModal } from "@getpara/react-sdk";
import { api } from "~/trpc/react";

export default function AdminAuth() {
  const [showParaLogin, setShowParaLogin] = useState(false);

  const utils = api.useUtils();

  const {
    data: admin,
    mutate: createAdmin,
    isSuccess,
    isPending,
  } = api.admin.addAdmin.useMutation({
    onSuccess: async () => {
      await utils.admin.invalidate();
    },
  });

  const finalizeLogin = async () => {
    const userId = para.getUserId() as string;
    const email = para.getEmail() as string;
    const address = para.getAddress() as string;
    const phoneNumber = para.getPhoneNumber() as string;
    const userShare = para.getUserShare() as string;
    createAdmin({
      userId,
      email,
      userShare,
      address,
      phoneNumber,
    });
  };

  return (
    <>
      <button onClick={() => setShowParaLogin(true)}>Login w/ Para</button>
      <ParaModal
        para={para}
        isOpen={showParaLogin}
        appName="ParaPregenDemo"
        disablePhoneLogin={false}
        // onClose={() => finalizeLogin()}
      />
    </>
  );
}
