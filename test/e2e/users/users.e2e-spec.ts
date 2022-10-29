import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/services';
import { createTestApp } from '../app';

describe('[UsersModule E2E]', () => {
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

  it('runs the test', () => expect(true).toBe(true));
});
