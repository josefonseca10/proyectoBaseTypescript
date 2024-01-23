import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';
describe('Test for apaEmployee', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should get list apaEmployee with params minimums', async () => {
    const response = await request(app.getHttpServer())
      .get('/apa-employee')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query({
        limit: 10,
        page: 1,
        sortBy: ['role:DESC'],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.items).toStrictEqual([]);
  });
});
