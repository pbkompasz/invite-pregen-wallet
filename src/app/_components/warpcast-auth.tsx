"use client";

import "@farcaster/auth-kit/styles.css";
import {
  createAppClient,
  SignInButton,
  useProfile,
  UseSignInData,
  viemConnector,
} from "@farcaster/auth-kit";
import { useEffect, useState } from "react";

// One hour expiry time for signature
const now = new Date();
now.setHours(now.getHours() + 1);
const expiryTime = now.toISOString();

export default function WarpcastAuth() {
  const { isAuthenticated, profile } = useProfile();

  const [hasValidSignature, setHasValidSignature] = useState(false);
  const [fid, setFid] = useState("");
  const [username, setUsername] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);

  const appClient = createAppClient({
    relay: "https://relay.farcaster.xyz",
    ethereum: viemConnector(),
  });

  useEffect(() => {
    setIsVerifying(true);
    const authSignature = localStorage.getItem("warpcast-signature");
    if (!authSignature) {
      console.log("No signature found in localStorage");
      return;
    }
    const parsedAuthSignature: UseSignInData = JSON.parse(authSignature);
    const {
      nonce,
      signatureParams: { domain },
      message,
      signature,
      username,
      fid,
    } = parsedAuthSignature;
    if (!message || !signature) {
      console.log("Missing message or signature");
      return;
    }
    appClient
      .verifySignInMessage({
        nonce,
        domain,
        message,
        signature,
      })
      .then((resp) => {
        if (resp.success) {
          setHasValidSignature(true);
          setUsername(username ?? "");
          setFid(username ?? "");
        } else {
          console.log("Invalid signature");
          setHasValidSignature(false);
          localStorage.set("warpcast-singature", undefined);
        }
        setIsVerifying(false);
      });
  }, []);

  const [showComponent, setShowComponent] = useState(true);

  const handleSuccess = (authResp: any) => {
    console.log(authResp);
    localStorage.setItem("warpcast-signature", JSON.stringify(authResp));
    setHasValidSignature(true);
    // Have to kill it programmatically, otherwise runs in infinite loop
    // Reference: https://github.com/farcasterxyz/auth-monorepo/issues/199
    setShowComponent(false);
  };

  return (
    <>
      {!isVerifying && (
        <>
          {isAuthenticated || hasValidSignature ? (
            <>
              Welcome {username ?? profile?.username} (#{fid ?? profile?.fid})
            </>
          ) : (
            <>
              {showComponent && (
                <SignInButton
                  expirationTime={expiryTime}
                  onSuccess={(resp) => handleSuccess(resp)}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
