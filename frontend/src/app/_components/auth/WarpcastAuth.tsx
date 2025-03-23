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

export default function WarpcastAuth({
  callback,
}: {
  callback?: (status: boolean) => void;
}) {
  const { isAuthenticated, profile } = useProfile();
  console.log(profile);

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
      setIsVerifying(false);
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
          callback?.(true);
        } else {
          console.log("Invalid signature");
          setHasValidSignature(false);
          localStorage.setItem("warpcast-singature", "");
          callback?.(false);
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
    <div className="border p-2">
      {!isVerifying && (
        <div className="flex flex-row items-center gap-2">
          {isAuthenticated || hasValidSignature ? (
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 1260 1260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <path
                    d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z"
                    fill="#472A91"
                  ></path>
                  <path
                    d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z"
                    fill="white"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="1259.61" height="1259.61" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              {profile?.username} (#{profile?.fid})
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
        </div>
      )}
    </div>
  );
}
