# TeamHub

TeamHub is a project management tool scaffolded as a TypeScript monorepo.

## Stack

- React 19
- TypeScript
- Vite
- NestJS
- GraphQL with Apollo
- PostgreSQL
- Prisma
- Docker and Docker Compose

## Project Structure

```text
teamhub/
  apps/
    frontend/   React + Vite + Apollo Client
    backend/    NestJS + GraphQL + Prisma
  docker-compose.yml
  package.json
```

## Prerequisites

- Node.js 20.11 or newer
- npm 10 or newer
- Docker and Docker Compose

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment files:

   ```bash
   cp .env.example .env
   cp .env.example apps/backend/.env
   ```

3. Start PostgreSQL:

   ```bash
   docker compose up postgres -d
   ```

4. Generate the Prisma client and run migrations:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Start both apps:

   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173`.
The GraphQL API runs at `http://localhost:4000/graphql`.

For frontend-only configuration, create `apps/frontend/.env.local` and set:

```bash
VITE_GRAPHQL_URL="http://localhost:4000/graphql"
```

## Docker Setup

Build and run the full stack:

```bash
docker compose up --build
```

Stop the stack:

```bash
docker compose down
```

To remove the database volume as well:

```bash
docker compose down -v
```

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run prisma:generate
npm run prisma:migrate
```

## Backend Notes

The backend exposes a small project/task GraphQL API:

- `projects`
- `project(id: ID!)`
- `createProject(input: CreateProjectInput!)`
- `createTask(input: CreateTaskInput!)`
- `updateTaskStatus(id: ID!, status: TaskStatus!)`

Prisma schema and migrations live in `apps/backend/prisma`.

## Frontend Notes

The frontend uses Apollo Client to read projects from the backend and render a compact dashboard.
