import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { getModelToken } from '@nestjs/mongoose';
import { TodoDto } from './todo.dto';

describe('TodoService', () => {
  let service: TodoService;

  const todo = new Todo('todo1');
  beforeEach(async () => {
    class mockTodoModel {
      private readonly todo;

      constructor(todoDto: TodoDto) {
        this.todo = todoDto;
      }

      static find() {
        return {
          exec: () => [
            {
              name: 'todo1',
            },
          ],
        };
      }

      save() {
        return new Promise((resolve) => resolve(this.todo));
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should return todo list', async () => {
    const todos = await service.getTodos();

    expect(todos).toMatchObject([todo]);
  });

  it('should save todo', async () => {
    const todoDto: TodoDto = {
      name: 'todo1',
    };
    const result = await service.addTodo(todoDto);

    expect(result).toMatchObject(todo);
  });
});
