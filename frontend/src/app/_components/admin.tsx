"use client";

import { ParaEthersSigner } from "@getpara/ethers-v6-integration";
import { ethers } from "ethers";
import "@getpara/react-sdk/styles.css";
import { useEffect, useState } from "react";
import { fetchFollowers } from "~/lib/platforms/warpcast";
import { useProfile } from "@farcaster/auth-kit";
import FollowerTable from "./FollowerTable";
import para, { pregenerateWallets } from "~/clients/para";
import AdminAuth from "./admin-auth";

export type WarpcastProfile = {
  displayName: string;
  fid: number;
  followerCount: number;
  followingCount: number;
  pfp: {
    url: string;
  };
  profile: {
    username: string;
  };
};

export function AdminDashboard() {
  const [followers, setFollowers] = useState<WarpcastProfile[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const paraSession = para.exportSession();
    para.isSessionActive().then(async (resp) => {
      if (!resp) {
        // Handle expired session
        console.log(resp);
        await para.refreshSession({ shouldOpenPopup: true });
      }
      para.isFullyLoggedIn().then((resp) => {
        setIsLoggedIn(true);
      });
    });
  }, []);

  useEffect(() => {
    const warpcastAuth = localStorage.getItem("warpcast-signature");
    let parsedWarpcastAuth;
    if (warpcastAuth) {
      parsedWarpcastAuth = JSON.parse(warpcastAuth);
    }
    const { fid } = parsedWarpcastAuth;
    if (!fid) return;
    fetchFollowers(+fid).then((fs) => {
      setFollowers(fs);
    });
  }, []);

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center gap-4 text-center">
      <div>
        {!isLoggedIn && <AdminAuth></AdminAuth>}
        {followers?.length && (
          <div>
            <FollowerTable followers={followers}></FollowerTable>
            Fetched {followers.length} followers
            <button onClick={() => pregenerateWallets(followers)}>
              Generate wallets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
