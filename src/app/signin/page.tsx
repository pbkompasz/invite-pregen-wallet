// src/pages/auth/signin.tsx
"use client";
import { useEffect, useState } from "react";
import capsule from "~/clients/capsule";
import "@usecapsule/react-sdk/styles.css";
import { OAuthMethod } from "@usecapsule/react-sdk";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const CapsuleModal = dynamic(
  () => import("@usecapsule/react-sdk").then((mod) => mod.CapsuleModal),
  { ssr: false },
);

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div style={{ backgroundColor: "blue"}}>
      <CapsuleModal
        capsule={capsule}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          router.push("/");
        }}
        appName="asd"
      />
    </div>
  );
}