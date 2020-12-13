import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { closeInMongodConnection, rootMongooseTestModule } from './utils/mongo';
import { TodoModule } from '../src/todo/todo.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), TodoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    done();
  });

  afterAll(async (done) => {
    await closeInMongodConnection();
    done();
  });

  it('Todo post and get', async (done) => {
    const todoDto = {
      name: 'todo1',
    };

    await request(app.getHttpServer())
      .post('/todo')
      .send(todoDto)
      .expect(201)
      .then((res) => {
        return expect(res.body).toMatchObject({
          name: 'todo1',
        });
      });

    await request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .then((res) => {
        return expect(res.body).toMatchObject([
          {
            name: 'todo1',
          },
        ]);
      });
    done();
  });
});
