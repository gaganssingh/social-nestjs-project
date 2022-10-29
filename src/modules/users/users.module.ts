import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/app/prisma';
import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
