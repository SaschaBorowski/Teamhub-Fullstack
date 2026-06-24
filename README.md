# TeamHub

TeamHub is a full-stack project management application built to gain hands-on experience with modern web development, backend architecture, databases, containerization, and cloud technologies.

The project focuses on building a complete project and task management platform using a modern TypeScript-based stack while continuously expanding functionality and infrastructure knowledge.

## Goals

This project is being developed to gain practical experience with:

* React
* TypeScript
* GraphQL
* NestJS
* Prisma
* PostgreSQL
* Docker
* Kubernetes (planned)
* Azure / Google Cloud Platform (planned)

---

## Current Features

### Projects

* Create projects from the UI
* View all projects
* Store projects in PostgreSQL

### Tasks

* Create tasks from the UI
* Assign tasks to projects
* Update task status
* Persist task data in PostgreSQL

### Backend

* GraphQL API
* NestJS backend architecture
* Prisma ORM integration

### Infrastructure

* Dockerized PostgreSQL database
* Local development environment with Docker Compose

---

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

---

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

---

## Project Structure

```text
teamhub/
├── apps/
│   ├── frontend/
│   └── backend/
├── docker-compose.yml
└── package.json
```

---

## Local Development

### Prerequisites

* Node.js 20+
* npm
* Docker Desktop

### Install Dependencies

```bash
npm install
```

### Start PostgreSQL

```bash
docker compose up -d postgres
```

### Run Database Migrations

```bash
cd apps/backend
npx prisma migrate dev
```

### Start Backend

```bash
cd apps/backend
npm run dev
```

### Start Frontend

```bash
cd apps/frontend
npm run dev
```

### URLs

Frontend:

```text
http://localhost:5173
```

GraphQL API:

```text
http://localhost:4000/graphql
```

---

## Roadmap

### Completed

* [x] React frontend
* [x] TypeScript setup
* [x] NestJS backend
* [x] GraphQL API
* [x] Prisma integration
* [x] PostgreSQL persistence
* [x] Docker setup
* [x] Create projects from UI
* [x] Create tasks from UI
* [x] Update task status from UI

### Planned

* [ ] Delete tasks
* [ ] Delete projects
* [ ] Task descriptions
* [ ] Drag & Drop Kanban board
* [ ] User authentication
* [ ] Role-based permissions
* [ ] NGINX reverse proxy
* [ ] Kubernetes deployment
* [ ] Azure deployment
* [ ] CI/CD pipeline

---

## Learning Objectives

TeamHub serves as a practical learning platform for:

* Full-stack application development
* API design with GraphQL
* Backend architecture with NestJS
* Database design and ORM usage
* Containerization with Docker
* Cloud deployment workflows
* Kubernetes orchestration
* CI/CD automation

---

## Status

This project is actively under development and used as a hands-on learning platform to explore modern full-stack engineering practices.
