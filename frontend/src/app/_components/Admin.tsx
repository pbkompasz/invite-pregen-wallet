"use client";

import "@getpara/react-sdk/styles.css";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { fetchFollowers } from "~/lib/frontend/warpcast";
import FollowerTable from "./FollowerTable";
import para, { mintNFTs } from "~/lib/frontend/para";
import { WarpcastProfile } from "~/lib/backend/warpcast";

export function AdminDashboard() {
  const [followers, setFollowers] = useState<WarpcastProfile[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState<
    { address: string | undefined | null; fid: number }[]
  >([]);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    para.isSessionActive().then(async (resp) => {
      if (!resp) {
        // NOTE This throws an error after cache is cleaned
        // await para.refreshSession({ shouldOpenPopup: true });
      }
      para.isFullyLoggedIn().then((resp) => {
        setIsLoggedIn(resp);
      });
    });
  }, []);

  const doFetch = async () => {
    const warpcastAuth = localStorage.getItem("warpcast-signature");
    let parsedWarpcastAuth;
    if (!warpcastAuth) {
      return;
    }

    parsedWarpcastAuth = JSON.parse(warpcastAuth);
    const { fid } = parsedWarpcastAuth;

    if (!fid) return;

    const followers = await fetchFollowers(+fid);
    setFollowers(followers);
  };

  const {
    data: user,
    mutate: pregenerateWallets,
    isSuccess,
    isPending,
  } = api.admin.pregenerateWallets.useMutation({
    onSuccess: async (
      addresses: { address: string | undefined | null; fid: number }[],
    ) => {
      console.log();
      setAddresses(addresses);
      setFollowers((prevItems) =>
        prevItems.map((follower) => {
          return {
            ...follower,
            address:
              addresses.find((addr) => addr.fid === follower.fid)?.address ??
              "",
          };
        }),
      );
    },
  });

  return (
    <div className="mt-4 flex min-w-[99vw] max-w-xs flex-col items-center justify-center gap-4 text-center">
      <button onClick={() => doFetch()} className="border rounded-lg p-2 text-3xl">Fetch followers</button>
      {followers?.length > 0 && (
        <div>
          <div className="mb-2 flex flex-row justify-between">
            <p className="text-3xl">Followers</p>
          </div>
          <FollowerTable followers={followers}></FollowerTable>
          <div className="my-4 flex flex-row justify-center gap-2 p-2">
            <button
              className="rounded-xl border p-2"
              onClick={async () => await pregenerateWallets(followers)}
            >
              Generate wallets
            </button>
            <button
              className="rounded-xl border p-2 text-sm"
              onClick={async () => {
                const resp = await mintNFTs(
                  addresses
                    .map((address) => address.address)
                    .filter((p) => typeof p === "string"),
                );
                setTxHash(resp);
              }}
            >
              Mint Giveaway NFTs
            </button>
          </div>
          {txHash && <>Successfully minted giveaway NFTs: #{txHash}</>}
        </div>
      )}
    </div>
  );
}
