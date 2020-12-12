import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should return todo list', () => {
    expect(service.getTodos()).toStrictEqual([new Todo('todo1')]);
  });
});
