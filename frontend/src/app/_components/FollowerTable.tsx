import Image from "next/image";

const FollowerTable = ({ followers }: { followers: any[] }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead
        className="flex w-full justify-evenly bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        style={{ position: "relative", display: "block" }}
      >
        <tr className="flex min-w-full">
          <th scope="col" className="w-[50px] flex-1 px-6 py-3"></th>
          <th scope="col" className="flex-auto px-6 py-3">
            Name (username)
          </th>
          <th scope="col" className="flex-1 px-6 py-3 mr-4">
            FID
          </th>
          <th scope="col" className="flex-1 px-6 py-3 mr-4">
            Wallet
          </th>
        </tr>
      </thead>
      <tbody
        className="max-h-[500px]"
        style={{ overflowY: "auto", display: "block" }}
      >
        {followers.map((follower) => (
          <tr
            key={follower.fid}
            className="flex justify-between border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <th className="min-w-[50px] max-w-[50px] flex-1">
              {follower.pfp && follower.pfp.url && (
                <Image
                  src={follower.pfp.url}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-2xl p-2 shadow-md"
                />
              )}
            </th>
            <th
              scope="row"
              className="max-w-[300px] flex-auto overflow-hidden whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {follower.displayName} ({follower.username})
            </th>
            <td className="max-w-[100px] flex-1 px-6 py-4">{follower.fid}</td>
            <td className="max-w-[100px] flex-1 overflow-hidden px-6 py-4 mr-4">
              {follower.address ?? "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FollowerTable;
