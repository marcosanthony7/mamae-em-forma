# Como Hospedar na Netlify - Guia Passo a Passo

Este guia explica como hospedar este aplicativo fullstack na Netlify.

## Importante: Limitacoes da Netlify

A Netlify e projetada para sites estaticos. Este app tem:
- **Frontend React** - Pode ser hospedado na Netlify
- **Backend Express** - Precisa ser convertido para Netlify Functions
- **Banco PostgreSQL** - Precisa de um servico externo (Neon, Supabase, etc.)

## Opcao Recomendada: Deploy Separado

### Passo 1: Configurar Banco de Dados Externo

1. Crie uma conta no [Neon](https://neon.tech) ou [Supabase](https://supabase.com)
2. Crie um novo banco de dados PostgreSQL
3. Copie a URL de conexao (DATABASE_URL)

### Passo 2: Hospedar Backend no Render

1. Crie uma conta no [Render](https://render.com)
2. Conecte seu repositorio GitHub
3. Crie um novo "Web Service"
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
   - **Environment Variables**:
     - `DATABASE_URL` - URL do banco Neon/Supabase
     - `FIREBASE_SERVICE_ACCOUNT_KEY` - JSON do Firebase Admin
     - `NODE_ENV` - production

5. Anote a URL do backend (ex: `https://seu-app.onrender.com`)

### Passo 3: Preparar Frontend para Netlify

1. Atualize o arquivo `client/src/lib/queryClient.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
```

2. Adicione a variavel de ambiente no Netlify:
   - `VITE_API_URL` = URL do backend no Render

### Passo 4: Criar Configuracao Netlify

Crie o arquivo `netlify.toml` na raiz do projeto:

```toml
[build]
  command = "cd client && npm run build"
  publish = "client/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Passo 5: Deploy na Netlify

1. Crie uma conta no [Netlify](https://netlify.com)
2. Clique em "Add new site" > "Import an existing project"
3. Conecte seu repositorio GitHub
4. Configure:
   - **Base directory**: (deixe vazio)
   - **Build command**: `cd client && npm run build`
   - **Publish directory**: `client/dist`

5. Adicione as variaveis de ambiente:
   - `VITE_API_URL` - URL do seu backend no Render
   - `VITE_FIREBASE_API_KEY` - Sua chave API do Firebase
   - `VITE_FIREBASE_PROJECT_ID` - ID do projeto Firebase
   - `VITE_FIREBASE_APP_ID` - App ID do Firebase

6. Clique em "Deploy site"

---

## Opcao Alternativa: Tudo na Netlify com Functions

### Passo 1: Instalar Dependencias

```bash
npm install serverless-http
```

### Passo 2: Criar Estrutura de Functions

Crie a pasta `netlify/functions/` e o arquivo `api.ts`:

```typescript
// netlify/functions/api.ts
import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Suas rotas aqui
app.get('/.netlify/functions/api/exercises', (req, res) => {
  res.json([/* seus exercicios */]);
});

// Adicione mais rotas conforme necessario

export const handler = serverless(app);
```

### Passo 3: Atualizar netlify.toml

```toml
[build]
  command = "cd client && npm run build"
  functions = "netlify/functions"
  publish = "client/dist"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Passo 4: Configurar Variaveis no Netlify

No painel da Netlify, va em Site Settings > Environment Variables:

- `DATABASE_URL` - URL do banco PostgreSQL externo
- `FIREBASE_SERVICE_ACCOUNT_KEY` - JSON do Firebase Admin
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

---

## Checklist Final

- [ ] Banco de dados PostgreSQL configurado (Neon/Supabase)
- [ ] Firebase configurado com dominio Netlify autorizado
- [ ] Variaveis de ambiente configuradas
- [ ] Build testado localmente com `npm run build`
- [ ] Site deployado e funcionando

## Configurar Firebase para Producao

1. Va ao [Console do Firebase](https://console.firebase.google.com)
2. Selecione seu projeto
3. Va em Authentication > Settings > Authorized domains
4. Adicione seu dominio Netlify: `seu-site.netlify.app`

## Solucao de Problemas

### Erro de CORS
Adicione o dominio Netlify nas configuracoes de CORS do backend.

### Erro de Build
Verifique se todas as dependencias estao no `package.json`.

### Erro de Autenticacao
Verifique se o dominio esta autorizado no Firebase Console.

---

## Alternativa Mais Simples: Replit Deployments

Se preferir uma opcao mais simples, o Replit oferece deploy integrado:

1. Clique no botao "Deploy" no Replit
2. Escolha "Autoscale" ou "Reserved VM"
3. Configure dominio personalizado se desejar

Esta opcao mantem tudo funcionando sem alteracoes no codigo.
