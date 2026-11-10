import Link from "next/link";
import { ArrowRight, BadgeDollarSign, BarChart3, Link2, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar wrap">
        <Link href="/" className="brand" aria-label="AS Braz">
          <img src="/logo-as-braz.png" alt="AS Braz" />
          <span>Rede de influenciadores</span>
        </Link>
        <Link className="text-link" href="/admin">Acessar painel <ArrowRight size={16} /></Link>
      </nav>

      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">Campanha exclusiva AS Braz</span>
          <h1>Uma indicação pode abrir a porta de uma nova história.</h1>
          <p>Influenciadores parceiros divulgam o imóvel com um link exclusivo. Cada acesso e conversa iniciada é acompanhado no painel.</p>
          <div className="hero-actions">
            <Link className="button gold" href="/admin">Gerenciar campanha <ArrowRight size={18} /></Link>
            <span className="commission"><strong>R$ 1.000</strong> para quem indicar o comprador</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustração arquitetônica de uma casa">
          <div className="sun" />
          <div className="house-roof" />
          <div className="house-body"><span /><span /><span /></div>
          <div className="gold-line" />
          <div className="art-note">Seu link.<br/><strong>Sua indicação.</strong></div>
        </div>
      </section>

      <section className="how wrap">
        <div className="section-heading">
          <span className="eyebrow">Como funciona</span>
          <h2>Do status ao WhatsApp, sem perder a origem do contato.</h2>
        </div>
        <div className="steps-grid">
          <article><span className="step-number">01</span><Link2 /><h3>Link individual</h3><p>Cada influenciador recebe um endereço exclusivo para compartilhar nos status e redes sociais.</p></article>
          <article><span className="step-number">02</span><MessageCircle /><h3>Mensagem pronta</h3><p>O interessado abre o WhatsApp com uma mensagem que já identifica quem fez a indicação.</p></article>
          <article><span className="step-number">03</span><BarChart3 /><h3>Métricas claras</h3><p>O painel reúne cliques, conversas iniciadas e a taxa de interesse de cada parceiro.</p></article>
          <article><span className="step-number">04</span><BadgeDollarSign /><h3>Venda reconhecida</h3><p>Quando a indicação vira venda, o responsável é identificado e recebe a comissão combinada.</p></article>
        </div>
      </section>

      <footer className="footer wrap"><span>AS Braz</span><p>Campanhas imobiliárias com indicação rastreável.</p></footer>
    </main>
  );
}
