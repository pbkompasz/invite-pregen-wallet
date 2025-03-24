import crypto from "crypto";

const privateKey = (process.env.ENCRYPTION_PRIV_KEY as string).replace(
  /\\n/g,
  "\n",
); 
export const encryptUserShare = (userShare: string) => {
  if (!privateKey) {
    return;
  }

  const buffer = Buffer.from(userShare, "utf8");
  const encrypted = crypto.privateEncrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer,
  );
  return encrypted.toString("base64");
};
