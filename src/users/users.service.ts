// src/users/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../share/services/prisma.service';
import { CreateUserRequestDto } from './dtos/users.dto';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<Users> {
    try {
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

    } catch (error) {
      console.log("hasta aqui llega", error.code)
      if (error.code === 'ER_DUP_ENTRY') { // MySQL unique violation error code
        throw new ConflictException('Unique constraint violation');
      } else {
        throw error;
      }
    }

  }

  // Other service methods...
}
