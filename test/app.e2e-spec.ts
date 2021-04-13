import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('POST', () => {
    it('/movies', () => {
      const test = {
        title: 'Testing on e2e',
        year: 201,
        genres: ['Please', 'pass', 'this'],
      };
      return request(app.getHttpServer())
        .post('/movies')
        .send(test)
        .expect(201);
    });
  });

  describe('GET', () => {
    it('/', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome there!');
    });

    it('/movies/1', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('/movies/999', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
  });

  describe('PATCH', () => {
    it('/movies/1', () => {
      const test = { year: 200 };
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send(test)
        .expect(200);
    });
  });

  describe('DELETE', () => {
    it('/movies', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
    it('/movies/1', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
