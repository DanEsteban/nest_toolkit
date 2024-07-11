// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../share/services/prisma.service';
import { CreateUserRequestDto } from './dtos/users.dto';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<Users> {
    const { email, name, lastname, role, password, active } = createUserDto;

    return this.prisma.users.create({
      data: {
        email,
        name,
        lastname,
        role,
        password,
        active,
      },
    });
  }

  // Other service methods...
}
