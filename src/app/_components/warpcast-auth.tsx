"use client";

import "@farcaster/auth-kit/styles.css";
import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { useState } from "react";

const now = new Date();
now.setHours(now.getHours() + 1);
const expiryTime = now.toISOString();

console.log(expiryTime);

export default function WarpcastAuth() {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();

  const [showComponent, setShowComponent] = useState(true);

  const handleSuccess = (resp: any) => {
    // Have to kill it programmatically, otherwise runs in infinite loop
    // Reference: https://github.com/farcasterxyz/auth-monorepo/issues/199
    setShowComponent(false);
    console.log(resp);
  };

  return (
    <>
      {isAuthenticated && (
        <>
          Welcome {username} (#{fid})
        </>
      )}
      {showComponent && (
        <SignInButton
          expirationTime={expiryTime}
          onSuccess={(resp) => handleSuccess(resp)}
        />
      )}
    </>
  );
}
