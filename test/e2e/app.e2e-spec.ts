import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services';
import * as request from 'supertest';
import { createTestApp } from './app';

describe('[AppController E2E]', () => {
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

  it('successfully runs the example E2E test', () => {
    expect(true).toBe(true);
  });
});
