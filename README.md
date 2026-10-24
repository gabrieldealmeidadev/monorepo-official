# Monorepo Base — React, Node.js e PostgreSQL

Projeto full stack organizado em monorepo, com frontend desenvolvido em React e TypeScript, API REST desenvolvida com Node.js, Express e TypeScript, e banco de dados PostgreSQL gerenciado pelo Prisma ORM.

O objetivo do projeto é manter frontend e backend no mesmo repositório, com aplicações independentes, configurações organizadas e possibilidade de publicação em serviços separados.

## Índice

- [1. Sobre o projeto](#1-sobre-o-projeto)
- [2. Tecnologias utilizadas](#2-tecnologias-utilizadas)
- [3. Arquitetura do monorepo](#3-arquitetura-do-monorepo)
- [4. Pré-requisitos](#4-pré-requisitos)
- [5. Instalação do projeto](#5-instalação-do-projeto)
- [6. Configuração das variáveis de ambiente](#6-configuração-das-variáveis-de-ambiente)
- [7. Banco de dados PostgreSQL](#7-banco-de-dados-postgresql)
- [8. Prisma ORM e migrations](#8-prisma-orm-e-migrations)
- [9. Executando o projeto](#9-executando-o-projeto)
- [10. API REST](#10-api-rest)
- [11. Frontend](#11-frontend)
- [12. Scripts disponíveis](#12-scripts-disponíveis)
- [13. Publicação no Render](#13-publicação-no-render)
- [14. Git e fluxo de desenvolvimento](#14-git-e-fluxo-de-desenvolvimento)
- [15. Segurança](#15-segurança)
- [16. Solução de problemas](#16-solução-de-problemas)
- [17. Próximas melhorias](#17-próximas-melhorias)

---

## 1. Sobre o projeto

Este projeto utiliza a arquitetura de monorepo para centralizar o código de diferentes aplicações em um único repositório Git.

O repositório contém:

- **Frontend:** interface web desenvolvida com React, TypeScript e Vite.
- **Backend:** API REST desenvolvida com Node.js, Express e TypeScript.
- **Banco de dados:** PostgreSQL.
- **ORM:** Prisma para comunicação com o banco e gerenciamento de migrations.
- **Infraestrutura local:** Docker Compose para executar o PostgreSQL, conforme a configuração do projeto.
- **Hospedagem:** Render para publicação da API, do banco de dados e do frontend.

O projeto também utiliza npm Workspaces para gerenciar as dependências e executar comandos específicos de cada aplicação a partir da raiz.

### Objetivos

- Centralizar frontend e backend no mesmo repositório.
- Manter as aplicações separadas e organizadas.
- Facilitar a execução e manutenção do projeto.
- Padronizar a configuração dos ambientes.
- Versionar as alterações com Git.
- Permitir deploy independente do frontend e do backend.
- Criar uma base para futuras funcionalidades.

## 2. Tecnologias utilizadas

| Tecnologia     | Finalidade                               |
| -------------- | ---------------------------------------- |
| JavaScript     | Linguagem base do ecossistema            |
| TypeScript     | Tipagem estática no frontend e backend   |
| Node.js        | Ambiente de execução do backend          |
| Express        | Criação da API REST                      |
| React          | Construção da interface                  |
| Vite           | Desenvolvimento e build do frontend      |
| PostgreSQL     | Banco de dados relacional                |
| Prisma ORM     | Acesso ao banco e migrations             |
| npm Workspaces | Gerenciamento do monorepo                |
| Docker Compose | Execução local dos serviços configurados |
| Git            | Versionamento do código                  |
| GitHub         | Hospedagem do repositório                |
| Render         | Hospedagem da aplicação                  |

## 3. Arquitetura do monorepo

A estrutura principal é organizada da seguinte maneira:

```text
monorepo-base/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── app.ts
│   │   │   ├── server.ts
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── ...
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── App.css
│       │   └── ...
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> A estrutura acima representa a organização principal. Os diretórios internos podem evoluir conforme novas funcionalidades forem adicionadas.

### 3.1. Diretório `apps/api`

Contém o backend, responsável por:

- Receber requisições HTTP.
- Processar as regras de negócio.
- Validar dados recebidos.
- Executar operações no banco de dados.
- Retornar respostas JSON.
- Disponibilizar os endpoints da aplicação.

O arquivo `src/app.ts` configura a aplicação Express, enquanto `src/server.ts` inicializa o servidor HTTP.

Os diretórios `controllers`, `routes` e `config` organizam, respectivamente, os controladores, as rotas e as configurações da aplicação.

### 3.2. Diretório `apps/web`

Contém o frontend React, responsável por:

- Exibir a interface ao usuário.
- Capturar dados de formulários.
- Consumir a API REST.
- Exibir os dados recebidos.
- Permitir as operações de gerenciamento de usuários.

O Vite fornece o servidor de desenvolvimento e gera os arquivos estáticos para publicação.

### 3.3. Arquivo `package.json` da raiz

O projeto utiliza npm Workspaces para centralizar o gerenciamento das aplicações.

Exemplo da configuração principal:

```json
{
  "name": "monorepo-base",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/api", "apps/web"],
  "scripts": {
    "dev:api": "npm run dev -w apps/api",
    "dev:web": "npm run dev -w apps/web"
  }
}
```

O campo `private: true` impede a publicação acidental do pacote raiz no registro público do npm.

Os Workspaces permitem instalar e gerenciar as dependências do monorepo sem precisar tratar cada aplicação como um repositório independente.

## 4. Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), incluído na instalação do Node.js.
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), caso deseje utilizar o banco de dados local via Docker.
- Um editor de código, como o [Visual Studio Code](https://code.visualstudio.com/).

Para conferir as versões instaladas:

```bash
node -v
npm -v
git --version
```

O ambiente de desenvolvimento utilizado na construção inicial do projeto possui Node.js 20.20.0. O ideal é manter uma versão do Node.js compatível com as dependências e com o ambiente de hospedagem.

## 5. Instalação do projeto

### 5.1. Clonar o repositório

```bash
git clone https://github.com/gabrieldealmeidadev/monorepo-official.git
```

Entre na pasta:

```bash
cd monorepo-official
```

### 5.2. Instalar as dependências

Execute o comando na raiz:

```bash
npm install
```

O npm utilizará a configuração de Workspaces para instalar e gerenciar as dependências das aplicações.

**Importante:** normalmente, não é necessário executar `npm install` separadamente dentro de `apps/api` e `apps/web`.

### 5.3. Configurar as variáveis de ambiente

Crie seu arquivo `.env` a partir do modelo:

No Git Bash:

```bash
cp .env.example .env
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

Depois, preencha o arquivo com os valores adequados para o ambiente local.

## 6. Configuração das variáveis de ambiente

As variáveis de ambiente armazenam configurações que podem mudar entre desenvolvimento e produção.

O arquivo `.env` deve ficar na raiz do monorepo. O arquivo `.env.example` deve conter apenas valores fictícios e nomes de variáveis necessários para configurar o projeto.

### 6.1. Exemplo de configuração

```dotenv
# API
PORT=3000

# PostgreSQL
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
POSTGRES_PORT=5432

# Banco de dados local
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco?schema=public"

# Frontend
VITE_API_URL=http://localhost:3000
```

Substitua os valores fictícios pelos valores do seu ambiente.

A `DATABASE_URL` deve apontar para o banco utilizado pela API. A variável `VITE_API_URL` deve conter somente o endereço base da API, sem acrescentar `/users`.

### 6.2. Como o Vite carrega o `.env` da raiz

O frontend está dentro de `apps/web`, mas o projeto configura o Vite para procurar as variáveis na raiz do monorepo.

O arquivo `apps/web/vite.config.ts` utiliza a opção `envDir`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(import.meta.dirname, "../../"),
});
```

Essa configuração permite utilizar o `.env` localizado na raiz, sem criar outro arquivo dentro de `apps/web`.

No frontend, a variável pode ser acessada desta forma:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

O prefixo `VITE_` permite que a variável seja disponibilizada ao código do frontend.

**Nunca coloque senhas, tokens privados ou credenciais do banco em variáveis `VITE_*`.** Essas variáveis podem ser incorporadas aos arquivos enviados ao navegador.

### 6.3. Arquivo `.gitignore`

O arquivo `.gitignore` deve impedir que arquivos sensíveis e artefatos gerados sejam enviados ao Git.

Exemplo:

```gitignore
node_modules/
dist/

.env
.env.*
!.env.example

apps/api/dist/
apps/web/dist/
```

Se já existirem outras regras no projeto, mantenha-as.

O `.env.example` deve ser versionado; o `.env` real deve permanecer fora do repositório.

## 7. Banco de dados PostgreSQL

O projeto utiliza PostgreSQL como banco relacional.

É possível utilizar um banco local, executado pelo Docker Compose, ou um banco hospedado em um serviço como o Render.

### 7.1. Banco local com Docker Compose

Se o arquivo `docker-compose.yml` estiver configurado na raiz, inicie o banco com:

```bash
docker compose up -d
```

Confira os serviços:

```bash
docker compose ps
```

Para visualizar os logs:

```bash
docker compose logs -f
```

Para parar os serviços:

```bash
docker compose down
```

O banco local deve utilizar os valores configurados no `.env`, incluindo usuário, senha, nome do banco e porta.

> O comando `docker compose down` normalmente mantém os volumes nomeados. Não utilize `docker compose down -v` sem entender que isso pode remover os dados persistidos no volume do banco.

### 7.2. Banco de produção

Em produção, a API deve utilizar a URL de conexão disponibilizada pelo provedor do PostgreSQL.

No Render, configure a variável `DATABASE_URL` nas variáveis de ambiente do serviço da API.

Não utilize a URL local com `localhost` para conectar a API hospedada ao banco de produção.

Sempre que possível, utilize a conexão interna do Render quando a API e o banco estiverem na mesma rede e região.

## 8. Prisma ORM e migrations

O Prisma ORM é utilizado para definir os modelos de dados, gerar o cliente de acesso ao banco e controlar as alterações da estrutura do PostgreSQL.

### 8.1. Schema do usuário

O modelo inicial de usuário está definido em `apps/api/prisma/schema.prisma`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid()) @db.Uuid
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

O modelo utiliza:

- `id`: identificador UUID gerado automaticamente.
- `name`: nome do usuário.
- `email`: e-mail único.
- `createdAt`: data de criação.
- `updatedAt`: data da última atualização.

O campo `email` possui uma restrição de unicidade, impedindo e-mails duplicados no banco.

### 8.2. Gerar o Prisma Client

Depois de instalar as dependências e configurar a conexão:

```bash
npm run db:generate -w apps/api
```

Esse comando gera o Prisma Client a partir do schema.

### 8.3. Criar uma migration em desenvolvimento

Quando o schema for alterado, crie uma migration usando:

```bash
npm run db:migrate -w apps/api
```

O comando utiliza `prisma migrate dev`, adequado ao desenvolvimento local.

Informe um nome descritivo quando o Prisma solicitar, se necessário.

### 8.4. Aplicar migrations existentes

Para aplicar migrations já criadas em um banco de dados:

```bash
npm run db:deploy -w apps/api
```

Esse comando utiliza `prisma migrate deploy` e é o apropriado para aplicar migrations versionadas em produção.

A pasta de migrations deve ser enviada ao Git junto com as alterações do schema.

### 8.5. Abrir o Prisma Studio

Para visualizar e editar registros por uma interface gráfica:

```bash
npm run db:studio -w apps/api
```

O Prisma Studio utiliza a `DATABASE_URL` do ambiente em que é executado. Confira essa variável antes de fazer alterações, principalmente se houver conexão com o banco de produção.

## 9. Executando o projeto

Após instalar as dependências, configurar o `.env` e disponibilizar o PostgreSQL, execute as etapas abaixo.

### 9.1. Gerar o Prisma Client

Na raiz:

```bash
npm run db:generate -w apps/api
```

### 9.2. Aplicar migrations no ambiente local

```bash
npm run db:deploy -w apps/api
```

Se ainda não houver migrations criadas, crie a migration inicial em desenvolvimento usando o comando `db:migrate`.

### 9.3. Iniciar a API

Em um terminal:

```bash
npm run dev:api
```

A API ficará disponível normalmente em:

```text
http://localhost:3000
```

A rota raiz pode ser acessada em:

```text
http://localhost:3000/
```

A rota de usuários fica em:

```text
http://localhost:3000/users
```

### 9.4. Iniciar o frontend

Em outro terminal, na raiz do monorepo:

```bash
npm run dev:web
```

O Vite exibirá o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Abra o endereço informado no navegador.

### 9.5. Comunicação entre frontend e backend

O frontend utiliza `VITE_API_URL` para determinar o endereço base da API.

Em desenvolvimento:

```dotenv
VITE_API_URL=http://localhost:3000
```

O código do frontend pode acrescentar `/users` para acessar os endpoints de usuários.

A API precisa permitir requisições vindas da origem do frontend por meio da configuração de CORS.

## 10. API REST

A API foi desenvolvida com Express e TypeScript e disponibiliza operações de gerenciamento de usuários.

### 10.1. Endpoints principais

| Método HTTP | Endpoint     | Finalidade                              |
| ----------- | ------------ | --------------------------------------- |
| GET         | `/`          | Verificar a rota raiz da API            |
| GET         | `/users`     | Listar usuários                         |
| GET         | `/users/:id` | Consultar um usuário pelo identificador |
| POST        | `/users`     | Cadastrar um usuário                    |
| PUT         | `/users/:id` | Atualizar um usuário                    |
| DELETE      | `/users/:id` | Excluir um usuário                      |

A disponibilidade exata dos endpoints com identificador depende das rotas implementadas no código. Consulte os arquivos de rotas e controladores para confirmar os caminhos e os formatos de resposta atuais.

### 10.2. Exemplo de cadastro

Requisição:

```http
POST /users
Content-Type: application/json
```

Corpo de exemplo:

```json
{
  "name": "Maria Silva",
  "email": "maria@example.com"
}
```

Os campos devem corresponder ao que o controlador realmente exige. Se a implementação atual exigir outros campos, como senha, eles também deverão ser enviados.

### 10.3. Exemplo de resposta

Uma resposta de sucesso pode retornar o registro criado, incluindo seu identificador e datas:

```json
{
  "id": "uuid-do-usuario",
  "name": "Maria Silva",
  "email": "maria@example.com",
  "createdAt": "2026-10-24T00:00:00.000Z",
  "updatedAt": "2026-10-24T00:00:00.000Z"
}
```

O formato ilustrado é um exemplo; a resposta real depende do objeto retornado pelo controlador.

### 10.4. Códigos HTTP

A API deve utilizar códigos HTTP apropriados para indicar o resultado das operações, por exemplo:

- `200 OK`: requisição executada com sucesso.
- `201 Created`: recurso criado.
- `400 Bad Request`: dados inválidos.
- `404 Not Found`: recurso não encontrado.
- `409 Conflict`: conflito, como um e-mail duplicado, quando tratado dessa forma pela aplicação.
- `500 Internal Server Error`: erro inesperado no servidor.

A implementação dos códigos e das mensagens depende dos controladores e do tratamento de erros existente no projeto.

## 11. Frontend

O frontend utiliza React, TypeScript e Vite.

O objetivo é fornecer uma interface web para consumir a API e permitir o gerenciamento dos usuários.

### 11.1. Funcionalidades

A interface foi iniciada para permitir:

- Consultar a lista de usuários.
- Cadastrar usuários.
- Editar registros.
- Excluir registros.
- Consumir os endpoints da API.
- Exibir os dados retornados pelo backend.

A disponibilidade de cada operação depende da implementação atual dos componentes e dos controladores.

### 11.2. URL da API

O endereço base é configurado pela variável:

```dotenv
VITE_API_URL=http://localhost:3000
```

O código utiliza:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

Isso permite manter o mesmo código para desenvolvimento e produção, alterando a configuração de ambiente.

### 11.3. Build do frontend

Para verificar se o frontend compila corretamente:

```bash
npm run build -w apps/web
```

Os arquivos de produção serão gerados no diretório `apps/web/dist`.

## 12. Scripts disponíveis

Os comandos devem ser executados na raiz do monorepo, salvo indicação contrária.

| Comando                           | Descrição                                             |
| --------------------------------- | ----------------------------------------------------- |
| `npm install`                     | Instala as dependências dos Workspaces                |
| `npm run dev:api`                 | Inicia a API em modo de desenvolvimento               |
| `npm run dev:web`                 | Inicia o frontend em modo de desenvolvimento          |
| `npm run db:generate -w apps/api` | Gera o Prisma Client                                  |
| `npm run db:migrate -w apps/api`  | Cria/aplica migrations no ambiente de desenvolvimento |
| `npm run db:deploy -w apps/api`   | Aplica migrations existentes                          |
| `npm run db:studio -w apps/api`   | Abre o Prisma Studio                                  |
| `npm run build -w apps/api`       | Compila a API TypeScript                              |
| `npm run build -w apps/web`       | Gera o build de produção do frontend                  |
| `npm run start -w apps/api`       | Inicia a API compilada                                |

Os scripts disponíveis dependem dos arquivos `package.json` de cada Workspace.

## 13. Publicação no Render

A arquitetura de produção utiliza serviços separados no Render, vinculados ao mesmo repositório GitHub.

### 13.1. Banco PostgreSQL

Crie ou utilize um banco PostgreSQL no Render.

Configure as credenciais e obtenha a URL de conexão apropriada para a API.

A variável `DATABASE_URL` deve ser configurada nas variáveis de ambiente do serviço da API.

### 13.2. API — Web Service

O serviço da API deve apontar para o mesmo repositório GitHub e para a branch de produção.

Configuração esperada:

| Campo           | Valor                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------- |
| Tipo de serviço | Web Service                                                                                 |
| Repositório     | `monorepo-official`                                                                         |
| Branch          | `main`                                                                                      |
| Root Directory  | Raiz do repositório                                                                         |
| Build Command   | `npm install --include=dev && npm run db:generate -w apps/api && npm run build -w apps/api` |
| Start Command   | `npm run start -w apps/api`                                                                 |

Configure no serviço:

- `DATABASE_URL`: URL do PostgreSQL de produção.
- `NODE_ENV`: `production`.

O Render fornece a variável `PORT` para o serviço web. O servidor deve utilizar a porta disponibilizada pelo ambiente, com um fallback local quando necessário.

Se o provedor oferecer um comando de pre-deploy, ele poderá ser configurado para executar:

```bash
npm run db:deploy -w apps/api
```

Isso permite aplicar as migrations antes da nova versão entrar em operação. Caso o plano ou o tipo de serviço não ofereça esse recurso, utilize um procedimento de migração compatível com o ambiente de produção.

Não execute `prisma migrate dev` no banco de produção.

### 13.3. Frontend — Static Site

Crie um Static Site no Render usando o mesmo repositório e a mesma branch.

Configuração esperada:

| Campo             | Valor                          |
| ----------------- | ------------------------------ |
| Tipo de serviço   | Static Site                    |
| Repositório       | `monorepo-official`            |
| Branch            | `main`                         |
| Root Directory    | `apps/web`                     |
| Build Command     | `npm install && npm run build` |
| Publish Directory | `dist`                         |

Como o frontend utiliza variáveis `VITE_*`, configure no ambiente de build do Static Site:

```dotenv
VITE_API_URL=https://SUA-API.onrender.com
```

Substitua o endereço de exemplo pela URL pública real do serviço da API.

A variável precisa estar disponível durante o build, porque o Vite incorpora essas configurações ao bundle do frontend.

### 13.4. Configuração de CORS

Como o frontend e a API podem ter domínios diferentes, a API precisa permitir a origem do frontend.

Durante o desenvolvimento, a origem costuma ser:

```text
http://localhost:5173
```

Em produção, utilize o domínio real do Static Site.

Exemplo de configuração para permitir as duas origens:

```typescript
import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:5173", "https://SEU-FRONTEND.onrender.com"],
  }),
);
```

Substitua o domínio de exemplo pelo endereço real do frontend. A configuração deve ser aplicada no arquivo que inicializa os middlewares da aplicação.

Depois de alterar o CORS, faça o deploy da API novamente.

### 13.5. Deploy automático

Com os serviços vinculados ao GitHub, o Render pode ser configurado para executar novos deploys quando houver atualizações na branch `main`.

O fluxo de trabalho será:

1. Alterar o código localmente.
2. Testar a alteração.
3. Executar o build quando aplicável.
4. Criar um commit.
5. Enviar a alteração para o GitHub.
6. Acompanhar o deploy no Render.
7. Testar a versão publicada.

O frontend e a API são serviços distintos. Uma alteração no código de um deles não exige necessariamente um novo build do outro, embora ambos possam compartilhar o mesmo repositório.

## 14. Git e fluxo de desenvolvimento

O projeto utiliza Git para versionamento e GitHub para armazenar o código.

### 14.1. Verificar as alterações

```bash
git status
```

### 14.2. Adicionar arquivos

Exemplo para uma alteração no frontend:

```bash
git add apps/web
```

Exemplo para uma alteração na API:

```bash
git add apps/api
```

Para adicionar a documentação:

```bash
git add README.md .env.example .gitignore
```

Antes de adicionar arquivos, confirme que o `.env` real não está sendo versionado.

### 14.3. Criar um commit

```bash
git commit -m "docs: update project documentation"
```

### 14.4. Enviar para o GitHub

```bash
git push origin main
```

Use mensagens de commit descritivas e evite incluir credenciais, arquivos de build ou dependências instaladas.

## 15. Segurança

As seguintes práticas devem ser respeitadas:

- Nunca enviar o `.env` real para o GitHub.
- Não incluir senhas, tokens privados ou credenciais em arquivos versionados.
- Utilizar `.env.example` com valores fictícios.
- Manter as credenciais de produção nas variáveis de ambiente do provedor de hospedagem.
- Não disponibilizar `DATABASE_URL` no frontend.
- Não utilizar variáveis `VITE_*` para segredos.
- Utilizar conexões HTTPS em produção.
- Limitar o CORS aos domínios autorizados.
- Aplicar migrations de forma controlada.
- Não expor mensagens internas sensíveis dos erros da API em produção.
- Redefinir credenciais caso sejam expostas acidentalmente.

O `.env.example` é um modelo de configuração, não um local para armazenar senhas reais.

## 16. Solução de problemas

### 16.1. Erro `Failed to fetch`

Possíveis causas:

- URL da API incorreta.
- API indisponível.
- Problema de CORS.
- Variável `VITE_API_URL` não configurada.
- Frontend utilizando um endereço local em produção.
- Falha de conexão ou erro de rede.

Verifique primeiro se a rota `/users` funciona diretamente no navegador. Depois confira a variável de ambiente e a configuração de CORS.

### 16.2. Erro informando que a tabela `User` não existe

Esse erro normalmente significa que a migration correspondente não foi aplicada ao banco utilizado pela API.

Confira se a variável `DATABASE_URL` aponta para o banco correto e aplique as migrations versionadas:

```bash
npm run db:deploy -w apps/api
```

Execute esse comando somente com a conexão correta e um procedimento adequado ao ambiente de destino.

### 16.3. Erros do Prisma Client

Gere o cliente novamente:

```bash
npm run db:generate -w apps/api
```

Se o problema persistir, confira a versão do Prisma, a versão do `@prisma/client` e o schema utilizado.

### 16.4. Erro de compilação TypeScript

Execute o build da aplicação correspondente:

```bash
npm run build -w apps/api
```

Ou:

```bash
npm run build -w apps/web
```

Verifique a mensagem completa do compilador antes de alterar dependências ou configurações.

### 16.5. A variável de ambiente não é reconhecida

Depois de alterar arquivos `.env`, reinicie o servidor de desenvolvimento.

No frontend publicado, confira se `VITE_API_URL` foi configurada no serviço do Render e se houve um novo build após a alteração.

### 16.6. A API responde, mas o frontend não acessa os dados

Confira:

1. A URL pública da API.
2. O endereço base utilizado pelo frontend.
3. A configuração de CORS.
4. A aba **Console** do navegador.
5. A aba **Network** para verificar a requisição e a resposta HTTP.

Essas verificações ajudam a identificar se o problema está na URL, na política do navegador ou no backend.

## 17. Próximas melhorias

O projeto pode evoluir com a implementação gradual de novas funcionalidades, incluindo:

- Autenticação de usuários.
- Autorização baseada em papéis.
- Proteção de rotas.
- Validação de dados.
- Documentação interativa da API com Swagger.
- Testes automatizados.
- Padronização de logs.
- Tratamento consistente de erros.
- Paginação e filtros na listagem de usuários.
- Melhorias na interface e na experiência do usuário.
- Integração contínua e automação dos deploys.
- Monitoramento e observabilidade.

Essas funcionalidades devem ser adicionadas conforme as necessidades do projeto e sempre acompanhadas de testes e documentação.

---

## Licença

Defina a licença do projeto antes de redistribuí-lo publicamente. Até que uma licença seja adicionada, não presuma que terceiros tenham autorização para reutilizar ou distribuir o código.

---

**Projeto desenvolvido com foco em aprendizado, organização e evolução gradual de uma aplicação full stack utilizando monorepo.**
