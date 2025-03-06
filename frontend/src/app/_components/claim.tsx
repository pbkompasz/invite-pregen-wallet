import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

const Claim = () => {
  const [enabled, setEnabled] = useState(false);
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    // Mint nft w/ click
  });

  const utils = api.useUtils();

  const warpcastAuth = localStorage.getItem("warpcast-signature");
  let parsedWarpcastAuth;
  if (warpcastAuth) {
    parsedWarpcastAuth = JSON.parse(warpcastAuth);
  }

  // Fetch user data
  const { data: user } = api.user.getUser.useQuery({
    fid: parsedWarpcastAuth?.fid,
  });

  // Fetch giveaways
  const { data: giveaways } = api.giveaway.getGiveaways.useQuery(userId, {
    enabled: enabled,
  });

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
      setEnabled(true);
    }
  }, [user]);

  // Claim wallet
  const claimWallet = async () => {};

  // Mint NFT
  const mintNft = async () => {};

  return (
    <>
      <h2>Claim your prize</h2>
      <p>You have to log in to claim your prize</p>
      {giveaways && giveaways.map((giveaway, index) => <>#{index + 1}</>)}
      {!user?.authStatus && (
        <>
          <button onClick={claimWallet}>Claim wallet</button>
        </>
      )}
      {user?.authStatus && <button onClick={mintNft}>Mint NFT</button>}
    </>
  );
};

export default Claim;
