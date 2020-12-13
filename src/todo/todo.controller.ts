import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { TodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  addTodo(@Body() todo: TodoDto): Promise<Todo> {
    return this.todoService.addTodo(todo);
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }
}
