"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function AdminDashboard() {
  const [users] = api.post.getUsers.useSuspenseQuery();

  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const inviteUser = api.post.addUser.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      setPhoneNumber("");
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center gap-4 text-center">
      {users && users.length ? (
        <table className="border-collapse border border-slate-500 ...">
          <thead>
            <tr>
              <th className="border border-slate-600 ...">Name</th>
              <th className="border border-slate-600 ...">Phone Number</th>
              <th className="border border-slate-600 ...">
                Authentication Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.phoneNumber}>
                <td className="border border-slate-700 ...">{user.name}</td>
                <td className="border border-slate-700 ...">
                  {user.phoneNumber}
                </td>
                <td className="border border-slate-700 ...">
                  {user.authStatus ? "Completed" : "Sent invite"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users invited yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          inviteUser.mutate({ name, phoneNumber });

        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
        </div>
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
