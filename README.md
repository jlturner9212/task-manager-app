# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

rails new task-manager-app --api --database=postgresql
rails g scaffold Task title:string description:text status:integer priority:integer due_date:date --api
touch docker-compose.yml
touch .env