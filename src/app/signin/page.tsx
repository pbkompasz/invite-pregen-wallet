// src/pages/auth/signin.tsx
"use client";
import { useState } from "react";
import para from "~/clients/para";
import "@usecapsule/react-sdk/styles.css";
import { useRouter } from "next/navigation";
import { ParaModal } from "@getpara/react-sdk";

// const CapsuleModal = dynamic(
//   () => import("@getpara/react-sdk").then((mod) => mod.CapsuleModal),
//   { ssr: false },
// );


export default function SignIn() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div style={{ backgroundColor: "blue" }}>
      asd
      <ParaModal
        para={para}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        logo={""}
        theme={{}}
        oAuthMethods={[]}
        disableEmailLogin={true}
        disablePhoneLogin={false}
        authLayout={["AUTH:FULL"]}
        externalWallets={[]}
        twoFactorAuthEnabled={false}
        recoverySecretStepEnabled={true}
        onRampTestMode
        appName="asd"
      />
    </div>
  );
}
