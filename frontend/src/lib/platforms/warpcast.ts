"use client";

export const fetchFollowers = async (fid: number, limit?: number) => {
  const url = `https://client.warpcast.com/v2/followers?fid=${fid}&limit=${limit ?? 50}`;
  let resp = await fetch(url);
  resp = await resp.json();
  console.log(resp);
  return (resp as any).result.users;
};
