import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { influencers } from "@/db/schema";
import { getDb } from "@/db";
import { isAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/data";

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.redirect(new URL("/admin/login", request.url),303);
  const form = await request.formData(); const name=String(form.get("name")||"").trim();
  if (!name) return NextResponse.redirect(new URL("/admin",request.url),303);
  const base=slugify(name)||"influenciador"; let slug=base; let suffix=1;
  const db=getDb();
  while ((await db.select({id:influencers.id}).from(influencers).where(eq(influencers.slug,slug)).limit(1)).length) slug=`${base}-${++suffix}`;
  await db.insert(influencers).values({ name, slug, instagram:String(form.get("instagram")||"").trim(), phone:String(form.get("phone")||"").trim(), commissionCents:Math.max(0,Math.round(Number(form.get("commission")||1000)*100)) });
  return NextResponse.redirect(new URL("/admin",request.url),303);
}
