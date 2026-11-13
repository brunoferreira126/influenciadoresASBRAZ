import { getStore } from "@netlify/blobs";

export type Influencer={id:string;name:string;slug:string;instagram:string;phone:string;commissionCents:number;active:boolean;createdAt:string};
export type Event={influencerId:string;kind:"click"|"whatsapp";createdAt:string};
export type Settings={title:string;location:string;originalPriceCents:number;discountPercent:number;whatsappNumber:string;description:string};
export const WHATSAPP_NUMBER="558581496514";
export const defaults:Settings={title:"Casa à venda",location:"Localização a confirmar",originalPriceCents:0,discountPercent:5,whatsappNumber:WHATSAPP_NUMBER,description:"Um imóvel especial, com condição exclusiva para contatos vindos da nossa rede de influenciadores."};
const store=()=>getStore("as-braz-campanha");
async function read<T>(key:string){const value=await store().get(key,{type:"text"});return value?JSON.parse(value) as T:null}
export async function write(key:string,value:unknown){await store().setJSON(key,value)}
export async function list<T>(prefix:string){const {blobs}=await store().list({prefix});return (await Promise.all(blobs.map(item=>read<T>(item.key)))).filter(Boolean) as T[]}
export async function settings(){return await read<Settings>("settings")||defaults}
export async function findInfluencer(slug:string){return (await list<Influencer>("influencers/")).find(item=>item.slug===slug&&item.active)}
export async function record(influencerId:string,kind:Event["kind"]){await write(`events/${Date.now()}-${crypto.randomUUID()}`,{influencerId,kind,createdAt:new Date().toISOString()})}
export function slugify(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{"cache-control":"no-store"}});
