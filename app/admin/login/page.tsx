import { LockKeyhole } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return <main className="login-page">
    <div className="login-art"><img src="/logo-as-braz.png" alt="AS Braz" /></div>
    <section className="login-box">
      <LockKeyhole size={28} />
      <span className="eyebrow">Acesso administrativo</span>
      <h1>Painel da campanha.</h1>
      <p>Entre com a senha para cadastrar influenciadores, configurar o imóvel e acompanhar os resultados.</p>
      {erro && <p className="error">Senha incorreta. Tente novamente.</p>}
      <form className="stack" action="/api/admin/login" method="post">
        <label>Senha<input name="password" type="password" autoComplete="current-password" required autoFocus /></label>
        <button className="button dark" type="submit">Entrar no painel</button>
      </form>
    </section>
  </main>;
}
