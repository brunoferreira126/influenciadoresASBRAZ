# AS Braz — Influenciadores

Sistema rápido para campanhas de indicação de imóvel.

## O que faz

- painel aberto em `/admin` para o proprietário cadastrar influenciadores;
- link individual no formato `/i/nome-do-influenciador`;
- contagem de acessos e de cliques que abrem o WhatsApp;
- mensagem automática identificando o influenciador;
- configuração do imóvel, desconto e número de atendimento;
- persistência no Netlify Blobs, sem credenciais do Google Drive.

## Rodar localmente

```bash
npm install
npm run dev
```

O comando usa o Netlify Dev para simular Functions e Blobs localmente.

## Publicar pelo Git no Netlify

1. Envie esta pasta para um repositório Git.
2. No Netlify, escolha **Add new project > Import an existing project**.
3. Se esta pasta estiver dentro de um repositório maior, defina o **Base directory** como `as-braz-influenciadores`.
4. O `netlify.toml` já configura build, pasta `dist` e Functions.

Depois do primeiro deploy, abra `/admin`, configure o imóvel e cadastre o primeiro influenciador.
