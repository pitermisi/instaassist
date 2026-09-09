import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  await destroySession();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "/";
  return NextResponse.redirect(appUrl);
}
