import {
  NodeOAuthClient,
  OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import { PrismaClient } from "@prisma/client";
import { SessionStore, StateStore } from "../storage";
import { BskyAgent } from "@atproto/api";

export function blueskyClientMetadata(): OAuthClientMetadataInput {
  // const baseUrl: string = process.env.NEXT_PUBLIC_URL as string
  const baseUrl: string = "http://localhost:3000";

  return {
    client_name: "Project Name",
    client_id: `http://localhost`,
    client_uri: `${baseUrl}`,
    redirect_uris: ["http://127.0.0.1:3000"],
    policy_uri: `${baseUrl}/policy`,
    tos_uri: `${baseUrl}/tos`,
    scope: "atproto transition:generic",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
  };
}

const createBlueskyClient = async (
  prisma: PrismaClient,
): Promise<NodeOAuthClient> =>
  new NodeOAuthClient({
    clientMetadata: blueskyClientMetadata(),
    stateStore: new StateStore(prisma),
    sessionStore: new SessionStore(prisma),
  });

export default createBlueskyClient;

const agent = new BskyAgent({ service: "https://public.api.bsky.app" });

export const fetchFollowers = async (username: string) => {
  if (!username) return;
  const resp = await agent.getFollowers({ actor: username });
  if (!resp.data.followers) {
    return;
  }
};
