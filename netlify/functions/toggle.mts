import type { Config,Context } from "@netlify/functions";
import { json,list,write,type Influencer } from "./_shared/store";
export default async(_req:Request,context:Context)=>{const id=context.params.id;const item=(await list<Influencer>("influencers/")).find(i=>i.id===id);if(!item)return json({error:"Não encontrado"},404);item.active=!item.active;await write(`influencers/${item.id}`,item);return json(item)};
export const config:Config={path:"/api/influencers/:id/toggle",method:"POST"};
