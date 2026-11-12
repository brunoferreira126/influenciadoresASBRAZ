import type { Config } from "@netlify/functions";
import { json,list,slugify,write,type Event,type Influencer,settings } from "./_shared/store";

export default async(req:Request)=>{
  if(req.method==="GET"){const influencers=await list<Influencer>("influencers/");const events=await list<Event>("events/");const rows=influencers.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(i=>({...i,clicks:events.filter(e=>e.influencerId===i.id&&e.kind==="click").length,whatsapps:events.filter(e=>e.influencerId===i.id&&e.kind==="whatsapp").length}));return json({influencers:rows,settings:await settings(),totals:{clicks:events.filter(e=>e.kind==="click").length,whatsapps:events.filter(e=>e.kind==="whatsapp").length}})}
  if(req.method==="POST"){const body=await req.json() as Record<string,string>;const name=String(body.name||"").trim();if(!name)return json({error:"Nome obrigatório"},400);const all=await list<Influencer>("influencers/");const base=slugify(name)||"influenciador";let slug=base,n=2;while(all.some(i=>i.slug===slug))slug=`${base}-${n++}`;const item:Influencer={id:crypto.randomUUID(),name,slug,instagram:String(body.instagram||"").trim(),phone:String(body.phone||"").trim(),commissionCents:Math.max(0,Math.round(Number(body.commission||1000)*100)),active:true,createdAt:new Date().toISOString()};await write(`influencers/${item.id}`,item);return json(item,201)}
  return json({error:"Método não permitido"},405)
};
export const config:Config={path:"/api/influencers"};
