import type { Dashboard,Settings } from "./types";
async function json<T>(url:string,options?:RequestInit):Promise<T>{const response=await fetch(url,options);if(!response.ok)throw new Error(await response.text());return response.json()}
export const api={
  dashboard:()=>json<Dashboard>("/api/influencers"),
  createInfluencer:(data:Record<string,unknown>)=>json("/api/influencers",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)}),
  toggle:(id:string)=>json(`/api/influencers/${id}/toggle`,{method:"POST"}),
  saveSettings:(data:Settings)=>json("/api/settings",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)}),
  publicData:(slug:string)=>json<{influencer:{name:string;slug:string};settings:Settings}>(`/api/public?slug=${encodeURIComponent(slug)}`)
};
