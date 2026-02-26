# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
tasks = [
  {
    title: "Set up project repository",
    description: "Initialize Git repo, configure .gitignore, and push initial commit.",
    status: :completed,
    priority: :high,
    due_date: Date.today - 2
  },
  {
    title: "Design database schema",
    description: "Define tables, relationships, and migrations for the task manager app.",
    status: :completed,
    priority: :high,
    due_date: Date.today - 1
  },
  {
    title: "Build REST API endpoints",
    description: "Implement CRUD endpoints for tasks including search and filtering.",
    status: :in_progress,
    priority: :high,
    due_date: Date.today + 1
  },
  {
    title: "Build React frontend",
    description: "Create task list, detail view, and create/edit form components.",
    status: :in_progress,
    priority: :medium,
    due_date: Date.today + 3
  },
  {
    title: "Write RSpec tests",
    description: "Cover model validations, and API request specs for all endpoints.",
    status: :pending,
    priority: :medium,
    due_date: Date.today + 5
  },
  {
    title: "Containerize with Docker",
    description: "Write Dockerfiles for API and frontend, wire up docker-compose.",
    status: :pending,
    priority: :low,
    due_date: Date.today + 7
  },
  {
    title: "Hire Jeff",
    description: "Bring on an experienced and determined developer.",
    status: :pending,
    priority: :high,
    due_date: Date.today + 7
  },
  {
    title: "Build amazing things",
    description: "Build amazing - Legendary applications with Reveal.",
    status: :pending,
    priority: :high,
    due_date: Date.today + 7
  }
]

tasks.each { |attrs| Task.find_or_create_by(title: attrs[:title]).update!(attrs) }

puts "Seeded #{Task.count} tasks"