import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './todo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  getTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async addTodo(todo: TodoDto): Promise<Todo> {
    const todoModel = new this.todoModel(todo);
    return todoModel.save();
  }
}
