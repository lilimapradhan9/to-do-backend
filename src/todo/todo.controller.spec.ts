import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoController', () => {
  let controller: TodoController;
  const todoList = [new Todo('todo1')];
  const mockGetTodoFunction = jest.fn(() => todoList);

  beforeEach(async () => {
    const dummyService = {
      getTodos: mockGetTodoFunction,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: dummyService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should return todo list', () => {
    expect(controller.getTodos()).toBe(todoList);
  });

  it('should call service to get todos', () => {
    expect(mockGetTodoFunction).toBeCalledTimes(1);
  });
});
