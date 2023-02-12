module Api
    module V1
        class TasksController < ApplicationController
            ALLOWED_DATA = %[title completed].freeze
            def index
                tasks = Task.all
                render json: tasks
            end

            def show
                task = Task.find(params[:id])
                render json: task
            end

            def create
                data = json_payload.select{|k| ALLOWED_DATA.include?(k)}
                task = Task.create(data)
                if task.save
                    render json: task, status: :created
                else
                    render json: task.errors, status: :unprocessable_entity
                end
            end
            #only update completed
            def update
                task = Task.find(params[:id])
                newData = json_payload.select{|k| ALLOWED_DATA.include?(k)}
                if task.update( completed: newData["completed"])
                    newTask = Task.find(params[:id])
                    render json: newTask, status: :ok 
                else
                    render json: task.errors, status: :unprocessable_entity
                end
            end

            def destroy
                task = Task.find(params[:id])
                if task.destroy
                    render json: task, status: :ok
                else
                    render json: task.errors, status: :unprocessable_entity
                end
            end
        end
    end
end