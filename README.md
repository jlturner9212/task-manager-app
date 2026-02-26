# Task Manager App

A full-stack task management application built with Ruby on Rails (API) and React. Supports creating, viewing, updating, deleting, and searching tasks with filtering by status and priority.

## Tech Stack

- **Backend:** Ruby on Rails 7.2.3 (API mode), Ruby 3.2.8
- **Frontend:** React (Create React App), Tailwind CSS, Axios
- **Database:** PostgreSQL 14
- **Containerization:** Docker + Docker Compose

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose

That's it — no local Ruby or Node installation required.

## Quick Start
```bash
git clone <your-repo-url>
cd task-manager-app
cp .env.example .env
./bin/setup.sh
```

The setup script will build the Docker images, start all services, run migrations, and seed the database.

| Service  | URL                                  |
|----------|--------------------------------------|
| Frontend | http://localhost:3000                |
| API      | http://localhost:8080/api/v1/tasks   |

## Environment Variables

Copy `.env.example` to `.env` and update the values as needed:
```env
POSTGRES_DB=task_manager_app
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_HOST=db
RAILS_ENV=development
RAILS_MASTER_KEY=<your-master-key>
```

> **Note:** In a production environment, secrets should be managed via a secrets manager such as HashiCorp Vault or AWS Secrets Manager rather than a `.env` file.

## Running the Test Suite
```bash
docker compose exec -e RAILS_ENV=test api bundle exec rspec spec/requests/api/v1/tasks_spec.rb --format documentation
```

## API Reference

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/v1/tasks         | List all tasks (supports filtering)|
| GET    | /api/v1/tasks/:id     | Get a single task                  |
| POST   | /api/v1/tasks         | Create a task                      |
| PATCH  | /api/v1/tasks/:id     | Update a task                      |
| DELETE | /api/v1/tasks/:id     | Delete a task                      |

### Query Parameters

| Param      | Description                              | Example              |
|------------|------------------------------------------|----------------------|
| `q`        | Search title or description              | `?q=setup`           |
| `status`   | Filter by status                         | `?status=in_progress`|
| `priority` | Filter by priority                       | `?priority=high`     |

## Design Decisions

- **Rails API mode** — lightweight, no view layer overhead, clean separation from the frontend.
- **React with CRA** — straightforward setup suitable for a focused assessment scope.
- **PostgreSQL `ILIKE`** for search — avoids introducing additional dependencies like Elasticsearch for a simple text search requirement.
- **Docker Compose** — single command setup with no local dependencies required from the reviewer.

> **Note:** I assumed no authentication was required based on the spec; this could be added via Devise + JWT

## Manual Setup (without Docker)

If you prefer to run services locally:
```bash
# Backend
bundle install
rails db:create db:migrate db:seed
rails server -p 8080

# Frontend
cd frontend
npm install
npm start
```
