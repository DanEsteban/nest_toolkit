// src/users/users.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../share/services/prisma.service';
import { CreateUserRequestDto } from './dtos/users.dto';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from './dtos/login.dto';
import { UpdateUserRequestDto } from './dtos/update.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<Users> {
    try {
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
      });

    } catch (error) {
      //console.log("hasta aqui llega", error.code)
      if (error.code === 'ER_DUP_ENTRY') { // MySQL unique violation error code
        throw new ConflictException('Unique constraint violation');
      } else {
        throw error;
      }
    }

  }

  async loginUser(loginUserDto: LoginUserRequestDto): Promise<Users>{
    try {
      const { email, password} = loginUserDto;
      const currentUser = await this.prisma.users.findUnique({ where: {email}});
      if (!currentUser) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const currentPassword = currentUser.password;
      const match  = await bcrypt.compare(password, currentPassword);
      
      if(match){
        return currentUser;
      }else{
        throw new UnauthorizedException('Invalid credentials, the password does not match');
      }
    } catch (error) {
      throw error
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserRequestDto): Promise<Users>{
    
    try {
      let user = updateUserDto;
      const {password} = user;

      if(password) { 
        const hashPassword = await bcrypt.hash(password, 10);
        user = {...user, password: hashPassword}
      }

      return this.prisma.users.update({
        where: { id },
        data: user
      });
      
    } catch (error) {
      throw error
    }
  }

  async deleteUser(id: number): Promise<Users>{
    try {
      
      return this.prisma.users.delete({
        where: {
          id
        }
      })

    } catch (error) {
      throw error
    }
  }

}
