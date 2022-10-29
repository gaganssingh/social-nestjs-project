import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/app/prisma/services';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return this.prisma.user.findMany();
  }

  public async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: { ...createUserDto },
    });
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
