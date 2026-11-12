import type { Config } from "@netlify/functions";
import { findInfluencer,json,settings } from "./_shared/store";
export default async(req:Request)=>{const slug=new URL(req.url).searchParams.get("slug")||"";const influencer=await findInfluencer(slug);if(!influencer)return json({error:"Link inválido"},404);return json({influencer:{name:influencer.name,slug:influencer.slug},settings:await settings()})};
export const config:Config={path:"/api/public"};
