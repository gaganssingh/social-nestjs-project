import { Module } from '@nestjs/common';
import { ConfigurationModule } from './app/configuration';
import { PrismaModule } from './app/prisma';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';

@Module({
  imports: [ConfigurationModule, PrismaModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
