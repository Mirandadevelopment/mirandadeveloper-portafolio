# Allan Miranda — Portfólio

Portfólio pessoal em **Dark Cyberpunk / Modern Tech** para Allan Miranda, Desenvolvedor Full Stack e Especialista FiveM (Lua/JS), com foco em automação para Discord e sistemas de gestão.

## Stack

- **Frontend:** Vite + React + Tailwind CSS v4 + GSAP (ScrollTrigger)
- **Backend:** Node.js + Express (API de contato, apenas para desenvolvimento local)
- **Efeitos:** partículas em canvas, cursor customizado, typing effect, 3D tilt e micro-interações

## Como rodar localmente

Pré-requisitos: Node.js 18+.

```bash
# Instalar dependências
cd frontend && npm install
cd ../backend && npm install

# Subir os dois serviços (frontend em :5173, backend em :3001)
./start.sh
```

Ou em dois terminais separados:

```bash
# Terminal 1 — backend (API de contato)
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Acesse `http://localhost:5173`.

> O frontend já tem proxy configurado: chamadas a `/api/*` são encaminhadas para o backend em `http://localhost:3001`.

## Estrutura do projeto

```
├── frontend/            # Aplicação React (Vite + Tailwind)
│   ├── public/          # favicon e CV (Allan-Miranda-CV.html)
│   └── src/
│       ├── components/  # Seções do site
│       └── App.jsx      # Composição das seções + animações GSAP
├── backend/             # API Express de contato (roda só no ambiente local)
├── .github/workflows/   # Deploy automático para GitHub Pages
├── start.sh             # Script que sobe frontend + backend
└── README.md
```

## Como publicar no GitHub e conseguir o link fixo gratuito

Siga estes passos para colocar o portfólio online de graça com o **GitHub Pages** — o link final será permanente e gratuito.

### 1. Criar um repositório no GitHub

1. Acesse https://github.com/new
2. Em **Repository name**, digite um nome, por exemplo `portfolio` (ou `allan-miranda-portfolio`)
3. Deixe como **Public** (necessário para o GitHub Pages gratuito)
4. **Não** marque "Add a README file" nem crie `.gitignore` nem licença (para evitar conflito)
5. Clique em **Create repository**

### 2. Enviar o código (a pasta do projeto)

Pelo site (mais simples):

1. Extraia o `.zip` do projeto em uma pasta
2. No repositório recém-criado, clique em **"uploading an existing file"**
3. Arraste todos os arquivos e pastas (**frontend**, **backend**, **.github**, `start.sh`, `README.md`, `.gitignore`)
4. Clique em **Commit changes**

Ou pelo terminal (Git):

```bash
cd <pasta-do-projeto>
git init
git add .
git commit -m "feat: portfólio Allan Miranda"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git push -u origin main
```

> Substitua `SEU-USUARIO` e `NOME-DO-REPO` pelos seus dados. Se pedir senha, use um token: https://github.com/settings/tokens (escopo `repo`).

### 3. Ativar o GitHub Pages

1. No repositório, vá em **Settings** → **Pages** (menu lateral)
2. Em **Build and deployment** → **Source**, selecione **GitHub Actions**
3. Feito isso, o fluxo `Deploy to GitHub Pages` já está configurado na pasta `.github/workflows` e roda automaticamente a cada push na branch `main`

### 4. Verificar o deploy

1. Vá na aba **Actions** do repositório
2. Aguarde os jobs **build** e **deploy** ficarem verdes
3. Seu site estará no link:

```
https://SEU-USUARIO.github.io/NOME-DO-REPO/
```

Esse é o seu **link fixo gratuito** — pode usar no GitHub, LinkedIn, currículo, Discord, etc.

> Dica: para testar, acesse a aba **Settings** → **Pages** depois do primeiro deploy; o GitHub mostra o link publicado.

## Notas

- **Formulário de contato:** no GitHub Pages não há backend. Se a API local não estiver disponível, o formulário exibe um botão para abrir o e-mail do visitante com a mensagem já preenchida.
- **CV:** o botão "Baixar CV" abre o `Allan-Miranda-CV.html` (pronto para imprimir/salvar em PDF).
- **Atualizações:** toda vez que você der `push` na branch `main`, o GitHub Pages atualiza o site automaticamente.
