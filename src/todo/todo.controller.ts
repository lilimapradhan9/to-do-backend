import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
}
