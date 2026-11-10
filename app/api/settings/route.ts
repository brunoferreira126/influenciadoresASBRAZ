import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { propertySettings } from "@/db/schema";
import { isAdmin } from "@/lib/admin-auth";
import { ensureSettings } from "@/lib/data";
export async function POST(request:Request) { if(!await isAdmin()) return NextResponse.redirect(new URL("/admin/login",request.url),303); const form=await request.formData(); await ensureSettings(); await getDb().update(propertySettings).set({title:String(form.get("title")||"Casa à venda").trim(),location:String(form.get("location")||"").trim(),originalPriceCents:Math.max(0,Math.round(Number(form.get("price")||0)*100)),discountPercent:Math.min(99,Math.max(0,Math.round(Number(form.get("discount")||0)))),whatsappNumber:String(form.get("whatsapp")||"").replace(/\D/g,""),description:String(form.get("description")||"").trim(),updatedAt:new Date().toISOString()}).where(eq(propertySettings.id,1)); return NextResponse.redirect(new URL("/admin",request.url),303); }
