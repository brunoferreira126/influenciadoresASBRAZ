import type { Config,Context } from "@netlify/functions";
import { findInfluencer,record,settings } from "./_shared/store";
export default async(req:Request,context:Context)=>{const slug=context.params.slug;const influencer=await findInfluencer(slug);const config=await settings();if(!influencer||!config.whatsappNumber)return Response.redirect(new URL(`/casa/${slug}`,req.url),302);await record(influencer.id,"whatsapp");const text=`Oi, vim pelo influenciador ${influencer.name} e gostaria de saber mais sobre a casa.`;return Response.redirect(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`,302)};
export const config:Config={path:"/go/:slug"};
