import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import { exchangeCodeForToken, getUserInfo } from "@/lib/instagram";
import { createSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "/";
  const dashboardUrl = `${appUrl}/dashboard`;
  const homeUrl = appUrl;

  // Handle OAuth errors
  if (error) {
    console.error("Instagram OAuth error:", error);
    return NextResponse.redirect(
      `${homeUrl}?error=instagram_authorization_failed`
    );
  }

  // Validate code exists
  if (!code) {
    return NextResponse.redirect(
      `${homeUrl}?error=missing_authorization_code`
    );
  }

  // Validate state parameter
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${homeUrl}?error=invalid_state`);
  }

  // Clear state cookie
  cookieStore.delete("oauth_state");

  try {
    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code);

    // Get user info from Instagram
    const userInfo = await getUserInfo(tokenData.access_token);

    // Encrypt the access token
    const encryptedToken = encrypt(tokenData.access_token);

    // Find or create user and Instagram account
    const existingAccount = await prisma.instagramAccount.findUnique({
      where: { instagramUserId: String(tokenData.user_id) },
    });

    let userId: string;

    if (existingAccount) {
      // Update existing account
      await prisma.instagramAccount.update({
        where: { id: existingAccount.id },
        data: {
          username: userInfo.username,
          name: userInfo.name || null,
          accountType: userInfo.account_type || null,
          profilePictureUrl: userInfo.profile_picture_url || null,
          accessTokenEncrypted: encryptedToken,
        },
      });
      userId = existingAccount.userId;
    } else {
      // Create new user and account
      const newUser = await prisma.user.create({
        data: {
          instagramAccounts: {
            create: {
              instagramUserId: String(tokenData.user_id),
              username: userInfo.username,
              name: userInfo.name || null,
              accountType: userInfo.account_type || null,
              profilePictureUrl: userInfo.profile_picture_url || null,
              accessTokenEncrypted: encryptedToken,
            },
          },
        },
      });
      userId = newUser.id;
    }

    // Create session
    await createSession(userId);

    return NextResponse.redirect(dashboardUrl);
  } catch (err) {
    console.error("Instagram callback error:", err);
    return NextResponse.redirect(
      `${homeUrl}?error=connection_failed`
    );
  }
}
