import { api, HydrateClient } from "~/trpc/server";
import Giveaway from "./give-away/page";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Bulk Pregen Demo</p>
          </div>
          <Giveaway></Giveaway>
        </div>
      </main>
    </HydrateClient>
  );
}
