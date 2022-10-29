import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services';
import * as request from 'supertest';
import { createTestApp } from '../app';
import { SIGNUP_URL } from '../constants';

describe('[AuthModule - signup user E2E]', () => {
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

  it('throws an error if not all fields are prvided', async () => {
    const signupUserDto = {};

    const { body } = await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(400);

    expect(body.error).toBe('Bad Request');
    expect(body.message).toEqual([
      'username must be a string',
      'email must be an email',
      'name must be a string',
      'Password must include at-least 1 uppercase, 1 lowercase, 1 number, and 1 special character.',
      'password must be shorter than or equal to 35 characters',
      'password must be longer than or equal to 8 characters',
      'city must be a string',
      'coverImg must be a string',
      'profileImg must be a string',
      'website must be a string',
    ]);
  });

  it('throws an error if passwords is invalid', async () => {
    const signupUserDto = {
      username: 'test-username',
      email: 't@t.com',
      password: 'invalidpassword',
      name: 'Name',
      city: 'Toronto',
      coverImg: 'http://image.com',
      profileImg: 'http://image.com',
      website: 'http://image.com',
    };

    const { body } = await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(400);
    expect(body.message).toEqual([
      `Password must include at-least 1 uppercase, 1 lowercase, 1 number, and 1 special character.`,
    ]);
  });

  it('throws an error if email address already in use', async () => {
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

    // Signup the same user again
    const { body } = await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(409);
    expect(body.message).toBe(
      `Email "${signupUserDto.email}" already in use; please login instead`,
    );
  });

  it('successfully signs up a new user', async () => {
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

    const { body } = await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(201);
    expect(body.email).toBe(signupUserDto.email);
    expect(body.username).toBe(signupUserDto.username);
    expect(body.name).toBe(signupUserDto.name);
    expect(body.id).toBeDefined();
  });

  it('should not return the password in the response', async () => {
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

    const { body } = await request(app.getHttpServer())
      .post(SIGNUP_URL)
      .send(signupUserDto)
      .expect(201);
    expect(body.password).not.toBeDefined();
  });
});
