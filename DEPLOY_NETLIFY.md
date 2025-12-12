# Como Hospedar na Netlify

Este guia ensina como fazer o deploy do seu aplicativo na Netlify.

## Passo 1: Preparar o Build

Execute o comando de build para gerar os arquivos estáticos:

```bash
npm run build
```

Isso criará uma pasta `dist` com os arquivos otimizados para produção.

## Passo 2: Criar Conta na Netlify

1. Acesse [netlify.com](https://www.netlify.com/)
2. Clique em "Sign up" no canto superior direito
3. Crie sua conta usando GitHub, GitLab, Bitbucket ou email

## Passo 3: Deploy Manual (Arrastar e Soltar)

### Opção Rápida:
1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Na seção "Sites", arraste a pasta `dist` para a área indicada
3. Aguarde o upload ser concluído
4. Seu site estará disponível em uma URL como `random-name.netlify.app`

## Passo 4: Deploy via GitHub (Recomendado)

### Configuração Inicial:
1. Faça push do seu projeto para um repositório no GitHub
2. Na Netlify, clique em "Add new site" > "Import an existing project"
3. Selecione "GitHub" e autorize o acesso
4. Escolha o repositório do seu projeto

### Configurações de Build:
- **Base directory:** (deixe em branco)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Clique em "Deploy site"

## Passo 5: Configurar Variáveis de Ambiente

Seu aplicativo precisa das seguintes variáveis de ambiente para funcionar:

1. No painel da Netlify, vá em **Site settings** > **Environment variables**
2. Clique em "Add a variable" e adicione cada uma:

| Variável | Descrição |
|----------|-----------|
| `VITE_FIREBASE_API_KEY` | Chave da API do Firebase |
| `VITE_FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `VITE_FIREBASE_APP_ID` | ID do app Firebase |

3. Após adicionar todas, faça um novo deploy para aplicar as variáveis

## Passo 6: Configurar Redirecionamentos (SPA)

O arquivo `_redirects` já está configurado em `client/public/_redirects` e será incluído automaticamente no build. Isso garante que as rotas do React funcionem corretamente.

Se precisar criar manualmente, adicione um arquivo `client/public/_redirects` com:

```
/*    /index.html   200
```

Ou adicione um arquivo `netlify.toml` na raiz do projeto:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Passo 7: Domínio Personalizado (Opcional)

1. Vá em **Site settings** > **Domain management**
2. Clique em "Add custom domain"
3. Digite seu domínio (ex: `meusite.com.br`)
4. Siga as instruções para configurar o DNS

### Configuração DNS:
- Adicione um registro **CNAME** apontando para `seu-site.netlify.app`
- Ou use os nameservers da Netlify para gerenciamento completo

## Passo 8: HTTPS Automático

A Netlify configura automaticamente o certificado SSL gratuito. Verifique em:
- **Site settings** > **Domain management** > **HTTPS**

## Comandos Úteis

```bash
# Gerar build de produção
npm run build

# Verificar se o build está correto localmente
npx serve dist
```

## Solução de Problemas

### Erro "Page not found" em rotas:
- Verifique se o arquivo `_redirects` está na pasta `public`
- Confirme se o `netlify.toml` está configurado corretamente

### Variáveis de ambiente não funcionam:
- Certifique-se de que começam com `VITE_`
- Faça um novo deploy após adicionar/alterar variáveis

### Build falha:
- Verifique os logs de build na Netlify
- Teste o build localmente com `npm run build`

## Suporte

- [Documentação Netlify](https://docs.netlify.com/)
- [Fórum da Comunidade](https://answers.netlify.com/)
