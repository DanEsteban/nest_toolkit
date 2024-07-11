import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Users } from '@prisma/client';
import { UsersService } from "./users.service";
import { CreateUserRequestDto } from "./dtos/users.dto";

@Controller('users')
export class UserController {
     
     constructor(private readonly usersService: UsersService) { }
     
     @Post()
     async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserRequestDto): Promise<Users> {
          return this.usersService.createUser(createUserDto);
     }
     
}