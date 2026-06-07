# Leka Dashboard

Dashboard financeiro pessoal estilo extrato bancário, desenvolvido com Next.js 16, React 19, Shadcn UI e Vercel Postgres (Neon).

## 🚀 Setup

### 1. Clone o repositório

```bash
git clone https://github.com/hpeixotosp/lekacontas.git
cd lekacontas
npm install
```

### 2. Configure o Vercel Postgres (Neon)

1. Crie uma conta ou acesse o projeto no [vercel.com](https://vercel.com)
2. Vá na aba **Storage** e crie um banco **Neon Postgres**
3. Conecte o banco de dados ao seu projeto
4. Copie a variável `DATABASE_URL` na aba **.env.local** do dashboard da Neon/Vercel

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL=postgresql://...sua_url_aqui...
```

### 4. Inicialize o Banco de Dados

Você pode inicializar as tabelas executando o script `schema.sql` diretamente no editor SQL do painel do Neon ou rodando o servidor e executando o seed.

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 6. Carregue os dados iniciais

Com o servidor rodando, acesse a rota de seed via POST:

```bash
curl -X POST http://localhost:3000/api/seed
```

Ou clique no botão **"Seed"** no canto superior direito do dashboard.

## 🌐 Deploy no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. Conecte o banco de dados no painel da Vercel (aba Storage)
3. Deploy! O Vercel injeta a variável `DATABASE_URL` automaticamente.

## 🛠 Tecnologias

- **Next.js 16** — App Router
- **React 19** — UI
- **Shadcn UI** — Componentes
- **Tailwind CSS v4** — Estilização
- **Vercel Postgres (Neon)** — Banco de dados PostgreSQL
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
