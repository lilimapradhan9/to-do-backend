import { Injectable } from '@nestjs/common';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  getTodos(): Todo[] {
    return [new Todo('todo1')];
  }
}
