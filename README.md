
# Descrição do Projeto: Lista de Tarefas Kanban

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - react-router-dom
  - Hooks: `useState`, `useEffect`, `useContext`
  - ContextAPI
  - Typescript
  - Axios
  - Radix UI (para interface)
  - Arquivo dedicado para funções da API: `api.ts` com CRUD completo
  - Variáveis de ambiente: `.env`

- **Backend:**
  - Node.js
  - SQL
  - ORM Prisma
  - Neon (PostgreSQL serverless)

- **Ferramentas e Plataformas:**
  - Insomnia (para testar a API)
  - Vercel (para hospedagem do frontend)
  - Neon (para banco de dados serverless)

## Descrição do Projeto

Este projeto consiste em uma **lista de tarefas no estilo Kanban**. O objetivo é promover a **rapidez de execução**, oferecendo um sistema simples e eficiente para gerenciar as tarefas. O projeto é composto por um **frontend em React**, utilizando o React Router para navegação e ContextAPI para gerenciar o estado global das tarefas.

A comunicação com a API é feita através de funções CRUD completas que estão localizadas no arquivo `api.ts`, permitindo a criação, leitura, atualização e exclusão de tarefas. O backend é implementado utilizando **Node.js** e o ORM **Prisma** para a manipulação do banco de dados **PostgreSQL serverless**, hospedado na **Neon**.

A aplicação está hospedada na **Vercel** e utiliza **variáveis de ambiente** definidas no arquivo `.env` para facilitar a configuração de diferentes ambientes (desenvolvimento e produção).

A interface foi criada com o auxílio de **Radix UI**, proporcionando uma experiência de usuário moderna e acessível.

## Funcionalidades

- **CRUD Completo:** Criação, leitura, atualização e exclusão de tarefas.
- **Kanban:** Organize as tarefas em três estados: "A Fazer", "Fazendo" e "Concluído".
- **Rápida Execução:** A aplicação foca em uma experiência simples e direta para gerenciar as tarefas de forma eficiente.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npm start
   ```

4. Para testar a API, utilize o **Insomnia** com as rotas configuradas para fazer as requisições.

## Deploy

- O frontend está hospedado na **Vercel**.
- O banco de dados está na **Neon** com **PostgreSQL serverless**.
