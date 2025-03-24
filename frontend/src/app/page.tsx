import { api, HydrateClient } from "~/trpc/server";
import Giveaway from "./_components/Giveaway";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Giveaway></Giveaway>
      </main>
    </HydrateClient>
  );
}
