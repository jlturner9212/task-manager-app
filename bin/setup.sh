#!/bin/bash

set -e

echo "🚀 Setting up Task Manager App..."

echo "📦 Building Docker images..."
docker compose build

echo "🐳 Starting services..."
docker compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 5

echo "🗄️  Running migrations..."
docker compose exec api bundle exec rails db:migrate

echo "🌱 Seeding database..."
docker compose exec api bundle exec rails db:seed

echo "✅ Setup complete!"
echo ""
echo "  Frontend: http://localhost:3000"
echo "  API:      http://localhost:8080/api/v1/tasks"