import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { influencers } from "@/db/schema";
import { getDb } from "@/db";
import { isAdmin } from "@/lib/admin-auth";
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}) { if(!await isAdmin()) return NextResponse.redirect(new URL("/admin/login",request.url),303); const id=Number((await params).id); const db=getDb(); const row=(await db.select().from(influencers).where(eq(influencers.id,id)).limit(1))[0]; if(row) await db.update(influencers).set({active:!row.active}).where(eq(influencers.id,id)); return NextResponse.redirect(new URL("/admin",request.url),303); }
