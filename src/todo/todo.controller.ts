import { Body, Controller, Get, Post} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  addTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.addTodo(todo);
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }
}
