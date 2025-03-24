import { createAppClient, viemConnector } from "@farcaster/auth-client";

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
  address: string,
  giveawayTx: string;
};

const appClient = createAppClient({
  relay: "https://relay.farcaster.xyz",
  ethereum: viemConnector(),
});

export const verifyWarpcastSignature = async (warpcastParams: {
  nonce: string;
  domain: string;
  message: string;
  signature: `0x${string}`;
}) => {
  const { nonce, domain, message, signature } = warpcastParams;
  // Verify SIWE signature
  const resp = await appClient.verifySignInMessage({
    nonce,
    domain,
    message,
    signature,
  });
  if (!resp.success || resp.isError) {
    console.log("Error verifying SIWE signature");
    return {
      isValid: false,
      fid: NaN,
    };
  }
  const regex = /fid\/(\d+)|Issued At:\s([0-9T:.Z-]+)/g;
  let match, fid, expiresAt;
  while ((match = regex.exec(message)) !== null) {
    if (match[1]) {
      console.log("FID:", match[1]);
      fid = match[1];
    }
    if (match[2]) {
      console.log("Issued At:", match[2]);
      expiresAt = match[2];
    }
  }
  if ((expiresAt && new Date() > new Date(expiresAt)) || !fid) {
    return {
      isValid: false,
      fid: fid ? +fid : NaN,
    };
  }
  return {
    isValid: true,
    fid: +fid,
  };
};
