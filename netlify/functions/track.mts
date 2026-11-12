import type { Config,Context } from "@netlify/functions";
import { findInfluencer,record } from "./_shared/store";
export default async(req:Request,context:Context)=>{const slug=context.params.slug;const influencer=await findInfluencer(slug);if(!influencer)return Response.redirect(new URL("/",req.url),302);await record(influencer.id,"click");return Response.redirect(new URL(`/casa/${slug}`,req.url),302)};
export const config:Config={path:"/i/:slug"};
