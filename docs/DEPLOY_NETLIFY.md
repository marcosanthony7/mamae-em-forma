# Como Hospedar na Netlify - Guia Passo a Passo

Este guia ensina como fazer deploy do frontend da aplicacao na Netlify.

## Pre-requisitos

- Conta na [Netlify](https://www.netlify.com/) (gratuita)
- Conta no [GitHub](https://github.com/)
- Projeto Firebase configurado

## Passo 1: Preparar o Build

Antes de fazer o deploy, voce precisa gerar os arquivos de build.

### 1.1 Gerar o Build Local

Execute o seguinte comando no terminal:

```bash
npm run build
```

Isso criara uma pasta `dist` com os arquivos otimizados para producao.

## Passo 2: Criar Repositorio no GitHub

### 2.1 Criar Novo Repositorio

1. Acesse [github.com/new](https://github.com/new)
2. De um nome ao repositorio (ex: `meu-app`)
3. Marque como "Private" se desejar
4. Clique em "Create repository"

### 2.2 Enviar o Codigo

No terminal, execute:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu-app.git
git push -u origin main
```

## Passo 3: Configurar na Netlify

### 3.1 Conectar Repositorio

1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Clique em "Add new site" > "Import an existing project"
3. Selecione "GitHub"
4. Autorize o acesso se solicitado
5. Selecione o repositorio que voce criou

### 3.2 Configurar Build

Na tela de configuracao, preencha:

| Campo | Valor |
|-------|-------|
| **Branch to deploy** | `main` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist/public` (ou verifique a pasta gerada apos o build) |

### 3.3 Configurar Variaveis de Ambiente

**IMPORTANTE:** Voce precisa adicionar as variaveis de ambiente do Firebase.

1. Clique em "Show advanced"
2. Em "Environment variables", adicione cada uma:

| Chave | Valor |
|-------|-------|
| `VITE_FIREBASE_API_KEY` | Sua chave da API do Firebase |
| `VITE_FIREBASE_PROJECT_ID` | ID do seu projeto Firebase |
| `VITE_FIREBASE_APP_ID` | ID do app Firebase |

3. Clique em "Deploy site"

## Passo 4: Configurar Redirects (SPA)

Para que as rotas funcionem corretamente, crie um arquivo `_redirects`:

### 4.1 Criar Arquivo de Redirects

Crie o arquivo `public/_redirects` com o seguinte conteudo:

```
/*    /index.html   200
```

Isso garante que todas as rotas sejam redirecionadas para o index.html (necessario para Single Page Applications).

### 4.2 Rebuild

Apos adicionar o arquivo, faca commit e push:

```bash
git add .
git commit -m "Add Netlify redirects"
git push
```

A Netlify fara o deploy automaticamente.

## Passo 5: Configurar Dominio Personalizado (Opcional)

### 5.1 Usar Subdominio Netlify

Por padrao, seu site tera um URL como: `https://seu-site.netlify.app`

Para alterar:
1. Va em "Site settings" > "Domain management"
2. Clique em "Options" ao lado do dominio
3. Clique em "Edit site name"
4. Digite o nome desejado

### 5.2 Usar Dominio Proprio

1. Va em "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Digite seu dominio (ex: `meusite.com`)
4. Siga as instrucoes para configurar o DNS

## Passo 6: Configurar Backend

**ATENCAO:** A Netlify hospeda apenas arquivos estaticos (frontend).

Para o backend funcionar, voce tem algumas opcoes:

### Opcao A: Hospedar Backend Separadamente

1. Use servicos como Railway, Render, ou Fly.io para o backend Express
2. Configure a URL do backend como variavel de ambiente no Netlify:
   - `VITE_API_URL=https://seu-backend.railway.app`

### Opcao B: Usar Netlify Functions (Serverless)

Converta as rotas do Express para Netlify Functions:

1. Crie pasta `netlify/functions`
2. Crie arquivos para cada endpoint

Exemplo de funcao:

```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify Functions!" }),
  };
};
```

## Troubleshooting

### Erro: "Page Not Found" ao acessar rotas

- Verifique se o arquivo `_redirects` esta na pasta `public/`
- Conteudo deve ser: `/*    /index.html   200`

### Erro: "Firebase Error"

- Verifique se todas as variaveis de ambiente estao configuradas
- As variaveis devem comecar com `VITE_` para funcionar no frontend

### Build falha

- Verifique se o comando de build e `npm run build`
- Verifique se a pasta de publicacao e `dist/public`

## Checklist Final

- [ ] Repositorio criado no GitHub
- [ ] Codigo enviado para o repositorio
- [ ] Site criado na Netlify
- [ ] Variaveis de ambiente configuradas
- [ ] Arquivo `_redirects` criado
- [ ] Deploy realizado com sucesso
- [ ] Testar login e funcionalidades

## Links Uteis

- [Documentacao Netlify](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Firebase Console](https://console.firebase.google.com/)
