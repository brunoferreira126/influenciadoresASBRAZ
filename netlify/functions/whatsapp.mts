import type { Config,Context } from "@netlify/functions";
import { findInfluencer,record,WHATSAPP_NUMBER } from "./_shared/store";
export default async(req:Request,context:Context)=>{const slug=context.params.slug;const influencer=await findInfluencer(slug);if(!influencer)return Response.redirect(new URL(`/casa/${slug}`,req.url),302);await record(influencer.id,"whatsapp");const text=`Olá, vim pelo código do influenciador ${influencer.name} e queria saber o que é preciso para comprar a casa.`;return Response.redirect(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,302)};
export const config:Config={path:"/go/:slug"};
