# Leka Dashboard

Dashboard financeiro pessoal estilo extrato bancário, desenvolvido com Next.js 14, React, Shadcn UI e Supabase.

## 🚀 Setup

### 1. Clone o repositório

```bash
git clone https://github.com/hpeixotosp/lekacontas.git
cd lekacontas
npm install
```

### 2. Configure o Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. No Supabase, vá em **SQL Editor** e execute o conteúdo de `schema.sql`
4. Vá em **Project Settings → API** e copie:
   - `Project URL`
   - `anon public key`

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 5. Carregue os dados iniciais

Com o servidor rodando, acesse a rota de seed:

```bash
curl -X POST http://localhost:3000/api/seed
```

Ou clique no botão **"Seed"** no canto superior direito do dashboard.

## 🌐 Deploy no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. No painel do Vercel, adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

## 🛠 Tecnologias

- **Next.js 14** — App Router
- **React 18** — UI
- **Shadcn UI** — Componentes
- **Tailwind CSS v4** — Estilização
- **Supabase** — Banco de dados PostgreSQL
- **Recharts** — Gráficos
- **Lucide React** — Ícones
- **Sonner** — Notificações toast

## 📊 Funcionalidades

- ✅ Extrato mensal (Fev – Dez 2026)
- ✅ Resumo de entradas (azul) e saídas (vermelho)
- ✅ Saldo acumulado anual
- ✅ Gráfico de barras mensal
- ✅ Adicionar novas transações
- ✅ Editar transações existentes
- ✅ Excluir transações
- ✅ Suporte a parcelamento
- ✅ Categorização por tipo
- ✅ Design dark premium
