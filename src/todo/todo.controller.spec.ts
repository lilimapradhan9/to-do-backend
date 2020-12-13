import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoController', () => {
  let controller: TodoController;
  const todo = new Todo('todo1');
  const todoList = [todo];
  const mockAddTodoFunction = jest.fn(() => todo);
  const mockGetTodoFunction = jest.fn(() => todoList);

  beforeEach(async () => {
    const dummyService = {
      addTodo: mockAddTodoFunction,
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

  it('should return save todo', () => {
    expect(
      controller.addTodo({
        name: 'todo1',
      }),
    ).toBe(todo);
  });

  it('should call service to save todo', () => {
    expect(mockAddTodoFunction).toBeCalledTimes(1);
  });

  it('should return todo list', async () => {
    expect(await controller.getTodos()).toBe(todoList);
  });

  it('should call service to get todos', () => {
    expect(mockGetTodoFunction).toBeCalledTimes(1);
  });
});
