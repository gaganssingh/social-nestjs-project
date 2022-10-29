import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services';
import * as request from 'supertest';
import { createTestApp } from '../app';
import { CURRENT_USER_URL, LOGIN_URL, SIGNUP_URL } from '../constants';

describe('[AuthModule - current-user E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
  });

  beforeEach(async () => {
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`throws 401 Unauthorized if JWT invalid`, async () => {
    const signupUserDto = {
      username: 'test-username',
      email: 't@t.com',
      password: 'Pa$$1234',
      name: 'Name',
      city: 'Toronto',
      coverImg: 'http://image.com',
      profileImg: 'http://image.com',
      website: 'http://image.com',
    };

    // Signup a new user
    await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(201);

    const loginUserDto = {
      email: 't@t.com',
      password: 'Pa$$1234',
    };

    await request(app.getHttpServer())
      .post(LOGIN_URL)
      .send(loginUserDto)
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get(CURRENT_USER_URL)
      .set('Authorization', `Bearer invalid-jwt`)
      .expect(401);

    expect(body.message).toBe('Unauthorized');
  });

  it(`returns the currently logged in user`, async () => {
    const signupUserDto = {
      username: 'test-username',
      email: 't@t.com',
      password: 'Pa$$1234',
      name: 'Name',
      city: 'Toronto',
      coverImg: 'http://image.com',
      profileImg: 'http://image.com',
      website: 'http://image.com',
    };

    // Signup a new user
    await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(201);

    const loginUserDto = {
      email: 't@t.com',
      password: 'Pa$$1234',
    };

    const { body } = await request(app.getHttpServer())
      .post(LOGIN_URL)
      .send(loginUserDto)
      .expect(200);

    const response = await request(app.getHttpServer())
      .get(CURRENT_USER_URL)
      .set('Authorization', `Bearer ${body.accessToken}`);

    expect(response.body).toBeDefined();
    expect(response.body.iat).toBeDefined();
    expect(response.body.exp).toBeDefined();
    expect(response.body.user.email).toBe(loginUserDto.email);
    expect(response.body.user.password).not.toBeDefined();
  });
});
