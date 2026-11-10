import { notFound } from "next/navigation";
import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { ensureSettings, getInfluencer } from "@/lib/data";

export const dynamic = "force-dynamic";
const money=(cents:number)=>(cents/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default async function PropertyPage({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{whatsapp?:string}>}) {
  const {slug}=await params; const influencer=await getInfluencer(slug); if(!influencer) notFound();
  const settings=await ensureSettings(); const offer=Math.round(settings.originalPriceCents*(1-settings.discountPercent/100)); const query=await searchParams;
  return <main className="property-page"><div className="property-wrap">
    <nav className="property-nav"><img src="/logo-as-braz.png" alt="AS Braz"/><span className="referred">Indicação de <strong>{influencer.name}</strong></span></nav>
    <section className="property-hero">
      <div className="property-visual" aria-label="Representação arquitetônica do imóvel" />
      <div className="property-copy">
        <span className="eyebrow">Condição exclusiva por indicação</span>
        <h1>{settings.title}</h1>
        <p className="location"><MapPin size={16} style={{display:"inline",verticalAlign:"-3px"}}/> {settings.location}</p>
        <p className="description">{settings.description}</p>
        <div className="offer"><span className="discount">-{settings.discountPercent}%</span><div className="price">{settings.originalPriceCents>0 ? <><small>{money(settings.originalPriceCents)}</small><strong>{money(offer)}</strong></> : <strong>Valor sob consulta</strong>}</div></div>
        <a className={`button whatsapp ${settings.whatsappNumber ? "" : "disabled"}`} href={settings.whatsappNumber?`/api/whatsapp/${slug}`:"#"}><MessageCircle size={20}/>{settings.whatsappNumber?"Quero saber mais pelo WhatsApp":"WhatsApp ainda não configurado"}</a>
        {query.whatsapp && <p className="error">O atendimento ainda não foi configurado. Tente novamente mais tarde.</p>}
        <p className="fine-print"><ShieldCheck size={13} style={{display:"inline",verticalAlign:"-2px"}}/> Seu contato será atendido diretamente pela equipe AS Braz. Condições sujeitas à confirmação.</p>
      </div>
    </section>
  </div></main>;
}
