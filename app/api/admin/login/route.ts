import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, getAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  if (!getAdminPassword() || form.get("password") !== getAdminPassword()) return NextResponse.redirect(new URL("/admin/login?erro=1", request.url), 303);
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, await adminToken(), { httpOnly:true, secure:true, sameSite:"strict", maxAge:60*60*12, path:"/" });
  return response;
}
