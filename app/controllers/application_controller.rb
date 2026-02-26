class ApplicationController < ActionController::API
  #protect_from_forgery with: :null_session # needed for test suite
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    render json: { error: "Not found" }, status: :not_found
  end
end
