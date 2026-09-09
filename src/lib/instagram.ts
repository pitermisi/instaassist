import { InstagramTokenResponse, InstagramUserInfo } from "@/types/instagram";

const INSTAGRAM_AUTH_URL = "https://www.instagram.com/oauth/authorize";
const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const INSTAGRAM_GRAPH_URL = "https://graph.instagram.com/v21.0";

// Scopes for Instagram Login - minimal permissions for MVP
export const INSTAGRAM_SCOPES = [
  "instagram_business_basic",
  "instagram_business_manage_messages",
].join(",");

export function getInstagramAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
    scope: INSTAGRAM_SCOPES,
    response_type: "code",
    state,
  });

  return `${INSTAGRAM_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string
): Promise<InstagramTokenResponse> {
  const formData = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    grant_type: "authorization_code",
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
    code,
  });

  const response = await fetch(INSTAGRAM_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token exchange failed:", response.status);
    throw new Error("Instagram access token exchange failed");
  }

  return response.json();
}

export async function getUserInfo(
  accessToken: string
): Promise<InstagramUserInfo> {
  const params = new URLSearchParams({
    fields: "id,username,name,account_type,profile_picture_url",
    access_token: accessToken,
  });

  const response = await fetch(
    `${INSTAGRAM_GRAPH_URL}/me?${params.toString()}`
  );

  if (!response.ok) {
    console.error("User info fetch failed:", response.status);
    throw new Error("Instagram profile could not be retrieved");
  }

  return response.json();
}
