"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function AdminDashboard() {
  const [users] = api.post.getUsers.useSuspenseQuery();

  const utils = api.useUtils();
  const [phoneNumber, setPhoneNumber] = useState("");
  const inviteUser = api.post.addUser.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setPhoneNumber("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {users && users[0] ? (
        <p className="truncate">User: {users[0].name}</p>
      ) : (
        <p>You have no users yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          inviteUser.mutate({ phoneNumber });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={inviteUser.isPending}
        >
          {inviteUser.isPending ? "In progress..." : "Invite"}
        </button>
      </form>
    </div>
  );
}
