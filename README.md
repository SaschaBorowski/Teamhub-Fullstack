# TeamHub

TeamHub is a full-stack project management application that I am building to improve my skills in modern web development and cloud-native technologies.

The goal of this project is to gain practical experience with:

* React
* TypeScript
* GraphQL
* NestJS
* Prisma
* PostgreSQL
* Docker
* Kubernetes (planned)
* Azure / Google Cloud Platform (planned)

## Current Features

* Project dashboard
* GraphQL API
* PostgreSQL persistence
* Project creation
* Task management foundation
* Dockerized database

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Apollo Client

### Backend

* NestJS
* GraphQL
* Prisma ORM

### Database

* PostgreSQL

### Infrastructure

* Docker
* Docker Compose

## Architecture

```text
React
  ↓
Apollo Client
  ↓
GraphQL API
  ↓
NestJS
  ↓
Prisma
  ↓
PostgreSQL
```

## Project Structure

```text
teamhub/
  apps/
    frontend/
    backend/
  docker-compose.yml
```

## Local Development

### Prerequisites

* Node.js 20+
* npm
* Docker Desktop

### Install dependencies

```bash
npm install
```

### Start PostgreSQL

```bash
docker compose up -d postgres
```

### Run database migrations

```bash
cd apps/backend
npx prisma migrate dev
```

### Start the backend

```bash
cd apps/backend
npm run dev
```

### Start the frontend

```bash
cd apps/frontend
npm run dev
```

Frontend:
http://localhost:5173

GraphQL:
http://localhost:4000/graphql

## Roadmap

* [x] React frontend
* [x] NestJS backend
* [x] GraphQL API
* [x] PostgreSQL integration
* [x] Docker setup
* [X] Create projects from UI
* [X] Create tasks from UI
* [ ] Drag & Drop Kanban board
* [ ] Authentication
* [ ] NGINX reverse proxy
* [ ] Kubernetes deployment
* [ ] Azure deployment
* [ ] CI/CD pipeline

## Learning Goals

This project serves as a practical learning platform for full-stack development, backend architecture, containerization, cloud infrastructure, and deployment workflows.
