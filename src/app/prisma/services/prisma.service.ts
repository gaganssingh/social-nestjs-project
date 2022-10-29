import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  // Teardown functon for E2E tests
  cleanDb() {
    // return this.user.deleteMany();
    return this.$transaction([
      this.comment.deleteMany(),
      this.story.deleteMany(),
      this.likes.deleteMany(),
      this.relationship.deleteMany(),
      this.post.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
