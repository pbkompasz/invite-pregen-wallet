"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useProfile } from "@farcaster/auth-kit";

const Claim = () => {
  const [enabled, setEnabled] = useState(false);
  const [userId, setUserId] = useState(-1);

  const { profile } = useProfile();

  const warpcastAuth = localStorage.getItem("warpcast-signature");
  let parsedWarpcastAuth;
  if (warpcastAuth) {
    parsedWarpcastAuth = JSON.parse(warpcastAuth);
  }

  const {
    data: user,
    isSuccess,
    isPending,
  } = api.user.get.useQuery(profile.fid as number, {
    enabled: !!profile.fid,
  });

  useEffect(() => {}, [profile]);

  // Claim wallet
  const claimWallet = async () => {};

  return (
    <>
      <h2>Claim your prize for your linked FID: #{profile.fid}</h2>
      {isSuccess && <>{user?.walletId}</>}
    </>
  );
};

export default Claim;
