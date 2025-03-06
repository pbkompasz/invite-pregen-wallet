import Image from "next/image";

const FollowerTable = ({ followers }: { followers: any[] }) => {
  return (
    <>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Name (username)
            </th>
            <th scope="col" className="px-6 py-3">
              FID
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Received giveaway
            </th> */}
          </tr>
        </thead>
        <tbody>
          {followers.map((follower) => (
            <tr key={follower.fid} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <th>
                {follower.pfp && follower.pfp.url && (
                  <Image
                    src={follower.pfp.url}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-2xl shadow-md"
                  />
                )}
              </th>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {follower.displayName} ({follower.username})
              </th>
              <td className="px-6 py-4">{follower.fid}</td>
              {/* <td className="px-6 py-4">{claimedWallets[follower.fid]}.</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FollowerTable;
