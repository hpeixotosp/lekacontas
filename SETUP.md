# Leka Dashboard — Configuração Vercel Postgres

## Setup do banco de dados

### 1. Conectar o repositório ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New → Project"**
3. Importe o repositório `hpeixotosp/lekacontas` do GitHub
4. **Não faça o deploy ainda** — primeiro configure o banco

### 2. Criar o banco de dados Postgres

1. No painel do Vercel, acesse **Storage** no menu lateral
2. Clique em **"Create Database"**
3. Escolha **"Neon Postgres"** (ou Postgres)
4. Dê um nome (ex: `lekacontas-db`) e confirme

### 3. Conectar o banco ao projeto

1. Na página do banco, clique em **"Connect Project"**
2. Selecione o projeto `lekacontas`
3. Isso vai adicionar automaticamente a variável `DATABASE_URL` ao projeto

### 4. Criar a tabela

1. No painel do Neon (ou Vercel Storage), abra o **SQL Editor**
2. Cole e execute o conteúdo do arquivo `schema.sql`

### 5. Configurar localmente

1. No Vercel, vá em **Storage → seu banco → .env.local tab**
2. Copie o snippet com `DATABASE_URL`
3. Cole em um arquivo `.env.local` na raiz do projeto:
   ```
   DATABASE_URL=postgresql://...
   ```

### 6. Rodar localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 7. Carregar os dados iniciais

- Clique no botão **"Seed"** no canto superior direito do dashboard, ou:
```bash
curl -X POST http://localhost:3000/api/seed
```

---

## Deploy

Após conectar o banco, o Vercel já terá as variáveis de ambiente configuradas automaticamente. Basta fazer um novo commit/push para acionar o deploy.

```bash
git add -A && git commit -m "chore: migrar para Vercel Postgres" && git push
```

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Next.js 16 (App Router) | Framework |
| React 19 + Shadcn UI | UI |
| Tailwind CSS v4 | Estilização |
| Neon Postgres | Banco de dados (via Vercel) |
| @neondatabase/serverless | Driver SQL |
| Recharts | Gráficos |
| Sonner | Notificações |
