class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  # GET /tasks
  def index
    @tasks = Task.all
    @tasks = @tasks.where("title ILIKE ? OR description ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%") if params[:q].present?
    @tasks = @tasks.where(status: params[:status]) if params[:status].present?
    @tasks = @tasks.where(priority: params[:priority]) if params[:priority].present?

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy!
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # gracefully handle not found instead of 404
    def not_found
      render json: { error: "Not found" }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :status, :priority, :due_date)
    end
end
