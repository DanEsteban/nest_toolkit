// src/users/users.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../share/services/prisma.service';
import { CreateUserRequestDto } from './dtos/create.users.dto';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from './dtos/login.dto';
import { UpdateUserRequestDto } from './dtos/update.users.dto';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUser(){
    return this.prisma.users.findMany();
  }

  async getOneUser(id: number){
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(createUserDto: CreateUserRequestDto){
    try {
      /*Primera forma de hacer
      const { email, name, lastname, role, password, active } = createUserDto;
      const hashPassword = await bcrypt.hash(password, 10);
      return this.prisma.users.create({
        data: {
          email,
          name,
          lastname,
          role,
          password: hashPassword,
          active,
        },
      });*/

      // Segunda forma de hacer
      const { password } = createUserDto;
      const hashPassword = await bcrypt.hash(password, 10);

      return this.prisma.users.create({
        data: { ...createUserDto, password: hashPassword },
      });
    } catch (error) {
      //console.log("hasta aqui llega", error.code)
      if (error.code === 'ER_DUP_ENTRY') {
        // MySQL unique violation error code
        throw new ConflictException('Unique constraint violation');
      } else {
        throw error;
      }
    }
  }

  async generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async loginUser(loginUserDto: LoginUserRequestDto){
    try {
      const { email, password } = loginUserDto;
      const currentUser = await this.prisma.users.findUnique({
        where: { email },
      });
      if (!currentUser) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const currentPassword = currentUser.password;
      const match = await bcrypt.compare(password, currentPassword);
      const now = DateTime.now();
      const futureTime  = now.plus({ hours: 1 });
      const iatTimeStamp = now.toMillis();
      const expTimeStamp = futureTime.toMillis();
      
      console.log(iatTimeStamp, expTimeStamp)

      if (match) {
        const payload = {
          userId: currentUser.id,
          // name: currentUser.name,
          // role: currentUser.role,
          iat: iatTimeStamp, //Initail Access Token
          exp: expTimeStamp,
        };
        const token = await this.generateJwtToken(payload);
        const updateUser = await this.prisma.users.update({
          where: { id: currentUser.id },
          data: { tokens: `${currentUser.tokens}, ${token}` },
        });
        const { active, email, id, lastname, name, role } = updateUser;

        // vamos a mandar solamente un token por cliente
        if (active) {
          return { email, lastname, id, role, name, tokens: token };
        } else {
          throw new UnauthorizedException(
            'Invalid credentials, the user is inactive',
          );
        }

        //return updateUser
      } else {
        throw new UnauthorizedException(
          'Invalid credentials, the password does not match',
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ) {
    try {
      let user = updateUserDto;
      const { password } = user;

      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        user = { ...user, password: hashPassword };
      }

      delete user.role;

      return this.prisma.users.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number){
    try {
      return this.prisma.users.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
