import type { Config } from "@netlify/functions";
import { json,write,type Settings } from "./_shared/store";
export default async(req:Request)=>{const body=await req.json() as Settings;const data:Settings={title:String(body.title||"Casa à venda").trim(),location:String(body.location||"").trim(),originalPriceCents:Math.max(0,Math.round(Number(body.originalPriceCents||0))),discountPercent:Math.min(99,Math.max(0,Math.round(Number(body.discountPercent||0)))),whatsappNumber:String(body.whatsappNumber||"").replace(/\D/g,""),description:String(body.description||"").trim()};await write("settings",data);return json(data)};
export const config:Config={path:"/api/settings",method:"POST"};
