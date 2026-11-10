import { redirect } from "next/navigation";
import { BarChart3, Eye, MessageCircle, MousePointerClick, Plus, Power, Settings2, Users } from "lucide-react";
import { isAdmin } from "@/lib/admin-auth";
import { getDashboardData } from "@/lib/data";
import { CopyLinkButton } from "@/components/copy-link-button";

export const dynamic = "force-dynamic";
const money = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style:"currency", currency:"BRL" });

export default async function AdminPage() {
  if (!await isAdmin()) redirect("/admin/login");
  const { rows, totals, settings } = await getDashboardData();
  const rate = totals.clicks ? Math.round(totals.whatsapps / totals.clicks * 100) : 0;
  return <main className="admin-shell">
    <header className="admin-nav"><div className="wrap">
      <div className="admin-logo"><img src="/logo-as-braz.png" alt="AS Braz"/><div>Campanha da casa<small>Painel de influenciadores</small></div></div>
      <form action="/api/admin/logout" method="post"><button className="button ghost" type="submit"><Power size={15}/> Sair</button></form>
    </div></header>
    <div className="admin-content wrap">
      <div className="admin-heading"><div><span className="eyebrow">Visão geral</span><h1>Resultados da campanha</h1><p>Acompanhe cada indicação desde o link até a abertura do WhatsApp.</p></div><a className="button dark" href="#novo"><Plus size={18}/> Novo influenciador</a></div>
      <section className="stat-grid">
        <div className="stat-card"><span><Users size={16}/> Influenciadores</span><strong>{rows.length}</strong></div>
        <div className="stat-card"><span><MousePointerClick size={16}/> Cliques nos links</span><strong>{totals.clicks}</strong></div>
        <div className="stat-card highlight"><span><MessageCircle size={16}/> Conversas iniciadas*</span><strong>{totals.whatsapps}</strong></div>
        <div className="stat-card"><span><BarChart3 size={16}/> Taxa de interesse</span><strong>{rate}%</strong></div>
      </section>
      <div className="admin-grid">
        <section className="panel">
          <div className="panel-head"><h2>Desempenho por influenciador</h2><span className="pill">Ao vivo</span></div>
          <div className="table-scroll">
            {rows.length ? <table><thead><tr><th>Influenciador</th><th>Status</th><th>Cliques</th><th>Conversas*</th><th>Conversão</th><th>Link</th></tr></thead><tbody>
              {rows.map(row => { const conversion = Number(row.clicks) ? Math.round(Number(row.whatsapps) / Number(row.clicks) * 100) : 0; return <tr key={row.id}>
                <td className="person">{row.name}<small>{row.instagram || row.phone || `/${row.slug}`}</small></td>
                <td><span className={`pill ${row.active ? "" : "off"}`}>{row.active ? "Ativo" : "Pausado"}</span></td>
                <td>{Number(row.clicks)}</td><td>{Number(row.whatsapps)}</td><td>{conversion}%</td>
                <td><div className="actions"><CopyLinkButton slug={row.slug}/><a className="icon-button" href={`/casa/${row.slug}`} target="_blank" title="Ver página"><Eye size={16}/></a><form action={`/api/influencers/${row.id}/toggle`} method="post"><button className="icon-button" type="submit" title="Ativar ou pausar"><Power size={16}/></button></form></div></td>
              </tr>; })}
            </tbody></table> : <div className="empty"><Users size={30}/><p>Nenhum influenciador cadastrado ainda.</p></div>}
          </div>
          <div className="panel-body"><div className="note">* “Conversas iniciadas” registra o clique que abre o WhatsApp. O WhatsApp não informa ao sistema se a mensagem foi efetivamente enviada.</div></div>
        </section>
        <div className="stack">
          <section className="panel" id="novo"><div className="panel-head"><h2>Novo influenciador</h2><Plus size={20}/></div><div className="panel-body">
            <form className="stack" action="/api/influencers" method="post">
              <label>Nome completo<input name="name" placeholder="Ex.: Ana Souza" required /></label>
              <div className="two-col"><label>Instagram<input name="instagram" placeholder="@usuario" /></label><label>WhatsApp<input name="phone" placeholder="(11) 99999-9999" /></label></div>
              <label>Comissão (R$)<input name="commission" type="number" min="0" step="0.01" defaultValue="1000.00" required /></label>
              <button className="button gold" type="submit">Cadastrar e gerar link</button>
            </form>
          </div></section>
          <section className="panel"><div className="panel-head"><h2>Configurar imóvel</h2><Settings2 size={20}/></div><div className="panel-body">
            <form className="stack" action="/api/settings" method="post">
              <label>Título do anúncio<input name="title" defaultValue={settings.title} required /></label>
              <label>Localização<input name="location" defaultValue={settings.location} required /></label>
              <div className="two-col"><label>Valor (R$)<input name="price" type="number" min="0" step="0.01" defaultValue={(settings.originalPriceCents/100).toFixed(2)} /></label><label>Desconto (%)<input name="discount" type="number" min="0" max="99" defaultValue={settings.discountPercent} /></label></div>
              <label>WhatsApp de atendimento<input name="whatsapp" inputMode="numeric" defaultValue={settings.whatsappNumber} placeholder="5511999999999" /></label>
              <label>Descrição<textarea name="description" rows={4} defaultValue={settings.description}/></label>
              <button className="button dark" type="submit">Salvar configurações</button>
            </form>
          </div></section>
          <div className="note"><strong>Comissão padrão:</strong> {rows[0] ? money(rows[0].commissionCents) : "R$ 1.000,00"}. O valor pode ser definido individualmente no cadastro.</div>
        </div>
      </div>
    </div>
  </main>;
}
