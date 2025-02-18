"use client";

import { ParaModal, WalletType } from "@getpara/react-sdk";
import { useEffect, useState } from "react";
import "@getpara/react-sdk/styles.css";
import para from "~/clients/para";
import { api } from "~/trpc/react";

import dynamic from "next/dynamic";

export function AdminDashboard() {
  // const [users] = api.post.getUsers.useSuspenseQuery();
  const users: any[] = [];

  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneLogin, setPhoneLogin] = useState("");

  useEffect(() => {
    // @ts-ignore
    para.checkIfUserExistsByPhone("+40741762695", "+40").then((resp) => {
      console.log(resp);
    });
  }, []);

  const {
    data: invitedUser,
    mutate: inviteUser,
    isSuccess,
    isPending,
  } = api.post.addUser.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      setPhoneNumber("");
    },
  });

  const saveUserWallet = api.post.saveUserWallet.useMutation({
    onSuccess: async () => {},
  });

  const checkPhoneNumber = async () => {
    console.log(phoneNumber);
    const resp = await para.hasPregenWallet({
      pregenIdentifier: phoneNumber,
      pregenIdentifierType: "PHONE",
    });
    console.log(resp);
    return !resp;
  };

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
            {users.map((user, id) => (
              <tr key={id}>
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
        // TODO Show errors in modal
        onSubmit={async (e) => {
          e.preventDefault();
          if (!(await checkPhoneNumber())) {
            console.error("User w/ number exists");
            return;
          }
          // await inviteUser({ name, phoneNumber });
          // if (!isSuccess) {
          //   console.error("Error saving user");
          //   // TODO
          //   return;
          // }
          const pregenWallet = await para.createWalletPreGen(
            {
              type: WalletType.EVM,
              pregenIdentifier: phoneNumber,
              pregenIdentifierType: "PHONE",
            },
            //   WalletType.EVM,
            //   phoneNumber,
            //   "PHONE",
          );
          console.log("Pregenerated Wallet ID:", pregenWallet.id);

          const userShare = await para.getUserShare();
          if (!userShare) {
            console.log("No user share");
            // TODO Revert everything
            return;
          }

          // await saveUserWallet.mutate({
          //   id: invitedUser,
          //   walletId: pregenWallet.id,
          //   userShare,
          // });

          // @ts-ignore
          para.checkIfUserExistsByPhone("741762695", "+40").then((resp) => {
            console.log(resp);
          });
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
          disabled={isPending}
        >
          {isPending ? "In progress..." : "Invite"}
        </button>
      </form>
      <form
        // TODO Show errors in modal
        onSubmit={async (e) => {
          e.preventDefault();
          // await capsule.logout();

          // check user has pregen wallet
          const resp = await para.hasPregenWallet({
            pregenIdentifier: "+40741762695",
            pregenIdentifierType: "PHONE",
          });

          console.log(resp);

          if (resp) {
            const webAuthUrlForLogin = await para.createUserByPhone(
              "741762695",
              // @ts-ignore
              "+40",
            );
            // setWebAuthURLForLogin(webAuthUrlForLogin);
            console.log("exists", webAuthUrlForLogin);
            return;
          }

          // TODO
          // Only invited users can join
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={phoneLogin}
            onChange={(e) => setPhoneLogin(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={isPending}
        >
          {/* {isPending ? "In progress..." : "Invite"} */}
          Sign in
        </button>
      </form>
      <ParaModal
        para={para}
        isOpen={false}
        appName="YourAppName"
        disablePhoneLogin={false} // Set to true if you want to exclude phone authentication
        onClose={function (): void {
          // throw new Error("Function not implemented.");
        }}
      />
      ;
    </div>
  );
}
