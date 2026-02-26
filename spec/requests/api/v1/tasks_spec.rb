require 'rails_helper'

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:valid_attributes) do
    {
      title: "Test Task",
      description: "Test description",
      status: "pending",
      priority: "medium",
      due_date: Date.today + 7
    }
  end

  let(:invalid_attributes) do
    { title: nil }
  end

  describe "GET /api/v1/tasks" do
    before { Task.create!(valid_attributes) }

    it "returns all tasks" do
      get "/api/v1/tasks"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to eq(Task.count)
    end

    it "filters by status" do
      Task.create!(valid_attributes.merge(title: "Completed Task", status: "completed"))
      get "/api/v1/tasks", params: { status: "completed" }
      tasks = JSON.parse(response.body)
      expect(tasks.all? { |t| t["status"] == "completed" }).to be true
    end

    it "filters by priority" do
      Task.create!(valid_attributes.merge(title: "High Priority Task", priority: "high"))
      get "/api/v1/tasks", params: { priority: "high" }
      tasks = JSON.parse(response.body)
      expect(tasks.all? { |t| t["priority"] == "high" }).to be true
    end

    it "searches by title" do
      Task.create!(valid_attributes.merge(title: "Unique searchable title"))
      get "/api/v1/tasks", params: { q: "Unique searchable" }
      tasks = JSON.parse(response.body)
      expect(tasks.any? { |t| t["title"] == "Unique searchable title" }).to be true
    end

    it "searches by description" do
      Task.create!(valid_attributes.merge(description: "Unique searchable description"))
      get "/api/v1/tasks", params: { q: "Unique searchable description" }
      tasks = JSON.parse(response.body)
      expect(tasks.any? { |t| t["description"] == "Unique searchable description" }).to be true
    end
  end

  describe "GET /api/v1/tasks/:id" do
    let(:task) { Task.create!(valid_attributes) }

    it "returns the task" do
      get "/api/v1/tasks/#{task.id}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["id"]).to eq(task.id)
    end

    it "returns 404 for missing task" do
      get "/api/v1/tasks/99999"
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/tasks" do
    it "creates a task with valid attributes" do
      expect {
        post "/api/v1/tasks", params: { task: valid_attributes }
      }.to change(Task, :count).by(1)
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["title"]).to eq("Test Task")
    end

    it "returns errors with invalid attributes" do
      post "/api/v1/tasks", params: { task: invalid_attributes }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to have_key("title")
    end
  end

  describe "PATCH /api/v1/tasks/:id" do
    let(:task) { Task.create!(valid_attributes) }

    it "updates the task" do
      patch "/api/v1/tasks/#{task.id}", params: { task: { title: "Updated Title" } }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["title"]).to eq("Updated Title")
    end

    it "returns errors with invalid attributes" do
      patch "/api/v1/tasks/#{task.id}", params: { task: invalid_attributes }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "DELETE /api/v1/tasks/:id" do
    let(:task) { Task.create!(valid_attributes) }

    it "deletes the task" do
      task
      expect {
        delete "/api/v1/tasks/#{task.id}"
      }.to change(Task, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end