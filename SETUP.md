# Leka Dashboard — Configuração Supabase

## Passos para configurar o banco de dados

### 1. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Clique em **"New project"**
4. Escolha um nome (ex: `lekacontas`) e uma senha forte
5. Aguarde a criação do projeto (~2 minutos)

### 2. Criar a tabela

1. No painel do Supabase, vá em **SQL Editor** (ícone de banco no menu lateral)
2. Clique em **"New query"**
3. Cole e execute o conteúdo do arquivo `schema.sql` deste projeto

### 3. Obter as credenciais

1. Vá em **Project Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **Project API keys** → `anon` `public`

### 4. Criar o arquivo .env.local

Na raiz do projeto, crie um arquivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

### 5. Carregar os dados iniciais

Após iniciar o servidor (`npm run dev`):

**Opção A** — pelo navegador: clique no botão **"Seed"** no dashboard

**Opção B** — pelo terminal:
```bash
curl -X POST http://localhost:3000/api/seed
```

---

## Deploy no Vercel

### 1. Variáveis de ambiente no Vercel

No painel do Vercel, em **Settings → Environment Variables**, adicione:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://SEU_ID.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sua_chave_anon` |

### 2. Seed em produção

Após o deploy, acesse:
```
https://seu-dominio.vercel.app/api/seed
```
Com método POST, ou use o botão "Seed" no dashboard em produção.
