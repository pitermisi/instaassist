import { NextResponse } from "next/server";
import { getInstagramAuthUrl, INSTAGRAM_SCOPES } from "@/lib/instagram";
import { generateState } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const state = generateState();

  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 minutes
  });

  const authUrl = getInstagramAuthUrl(state);

  return NextResponse.redirect(authUrl);
}
