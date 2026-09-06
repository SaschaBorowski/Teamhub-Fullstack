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
* Edit project name
* Edit project description
* Delete projects
* Store projects in PostgreSQL

### Tasks

* Create tasks from the UI
* Assign tasks to projects
* Update task status
* Edit task title
* Add task descriptions
* View task descriptions
* Edit task descriptions
* Delete tasks
* Persist task data in PostgreSQL

### Backend

* GraphQL API
* NestJS backend architecture
* Prisma ORM integration
* Project CRUD operations
* Task CRUD operations
* Prisma cascade delete for project tasks

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
