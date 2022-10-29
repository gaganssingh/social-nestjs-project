import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services';
import * as request from 'supertest';
import { createTestApp } from '../app';
import { LOGIN_URL, SIGNUP_URL } from '../constants';

describe('[AuthModule - login user E2E', () => {
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

  it('throws 401 Unauthorized error if password is incorrect', async () => {
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
      password: 'invalid password',
    };

    const { body } = await request(app.getHttpServer())
      .post(LOGIN_URL)
      .send(loginUserDto)
      .expect(401);

    expect(body.error).toBe('Unauthorized');
    expect(body.message).toBe('Invalid credentials provided; please try again');
  });

  it("successfully logs in and responds with the user's email and a jwt", async () => {
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

    expect(body.email).toBe(loginUserDto.email);
    expect(body.accessToken).toBeDefined();
    expect(typeof body.accessToken).toBe('string');
  });
});
