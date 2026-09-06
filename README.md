<div align="center">

# 🚀 TeamHub

### A modern full-stack project management application

Manage projects and tasks in one place — built from scratch with **React, TypeScript, NestJS, GraphQL, Prisma and PostgreSQL**.

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 📌 About the Project

**TeamHub** is a full-stack project management application created as a personal learning project.

The goal is to build a real-world application step by step while learning how modern frontend and backend technologies work together.

The project is intentionally developed incrementally — starting with the core functionality and gradually expanding towards a more complete production-style application.

---

## ✨ Current Features

### 📁 Projects

- ✅ Create projects
- ✅ View projects
- ✅ Edit project names
- ✅ Edit project descriptions
- ✅ Delete projects
- ✅ Persist projects in PostgreSQL
- ✅ Automatically delete related tasks when a project is deleted

### ✅ Tasks

- ✅ Create tasks
- ✅ Assign tasks to projects
- ✅ Update task status
- ✅ Edit task titles
- ✅ Add task descriptions
- ✅ View task descriptions
- ✅ Edit task descriptions
- ✅ Delete tasks
- ✅ Persist tasks in PostgreSQL

### ⚙️ Backend

- ✅ GraphQL API
- ✅ NestJS backend
- ✅ Prisma ORM
- ✅ PostgreSQL database
- ✅ Project CRUD operations
- ✅ Task CRUD operations
- ✅ Prisma relations between projects and tasks
- ✅ Cascade deletion for project tasks

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│          React Frontend      │
│      TypeScript + Vite       │
└──────────────┬───────────────┘
               │
               │ GraphQL
               ▼
┌──────────────────────────────┐
│          NestJS API          │
│         GraphQL Layer        │
└──────────────┬───────────────┘
               │
               │ Prisma
               ▼
┌──────────────────────────────┐
│        PostgreSQL DB         │
└──────────────────────────────┘

              Docker
     ┌────────┴─────────┐
     │                  │
 Frontend            Backend
```

---

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| GraphQL Client | Apollo Client |
| Backend | NestJS |
| API | GraphQL |
| ORM | Prisma |
| Database | PostgreSQL |
| Containerization | Docker / Docker Compose |
| Version Control | Git / GitHub |

---

## 📂 Project Structure

```text
Teamhub-Fullstack/
│
├── apps/
│   ├── frontend/
│   │   └── src/
│   │       └── App.tsx
│   │
│   └── backend/
│       ├── src/
│       │   ├── projects/
│       │   ├── tasks/
│       │   └── ...
│       │
│       └── prisma/
│           └── schema.prisma
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- Docker
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SaschaBorowski/Teamhub-Fullstack.git
cd Teamhub-Fullstack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start PostgreSQL

```bash
docker compose up -d
```

### 4. Start the backend

```bash
cd apps/backend
npm run start:dev
```

GraphQL API:

```text
http://localhost:4000/graphql
```

### 5. Start the frontend

Open another terminal:

```bash
cd apps/frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🗺️ Roadmap

### ✅ Completed

- [x] React frontend
- [x] TypeScript
- [x] NestJS backend
- [x] GraphQL API
- [x] Prisma ORM
- [x] PostgreSQL database
- [x] Docker setup
- [x] Create, edit and delete projects
- [x] Create and assign tasks
- [x] Update task status
- [x] Edit task titles
- [x] Add and edit descriptions
- [x] Delete tasks

### 🔜 Planned

- [ ] Task priorities
- [ ] Kanban board
- [ ] Drag & Drop
- [ ] User authentication
- [ ] User roles & permissions
- [ ] NGINX
- [ ] Kubernetes
- [ ] Cloud deployment with Azure / GCP
- [ ] CI/CD pipeline

---

## 🎯 Learning Goals

This project is also a practical learning environment.

The main goals are:

- Understand modern React development
- Improve TypeScript skills
- Learn how frontend and backend communicate
- Understand GraphQL
- Learn NestJS architecture
- Work with Prisma and relational databases
- Learn Docker and containerization
- Understand authentication and authorization
- Learn deployment concepts
- Gain experience with Kubernetes and CI/CD

---

## 📸 Preview

> Screenshots will be added here as the application evolves.

---

## 📈 Project Status

**🟢 Active Development**

TeamHub is continuously being expanded with new features and technologies.

The application currently focuses on core project and task management. More advanced features such as authentication, permissions, Kanban functionality and deployment infrastructure will be added over time.

---

## 🤝 Contributing

This is primarily a personal learning project, but suggestions and ideas are always welcome.

If you notice something that could be improved, feel free to open an issue or start a discussion.

---

<div align="center">

### Built with ❤️ while learning full-stack development

**TeamHub — Learn. Build. Improve.**

</div>
