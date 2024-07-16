import { Body, Controller, Post, UseFilters, ValidationPipe } from "@nestjs/common";
import { Users } from '@prisma/client';
import { UsersService } from "./users.service";
import { CreateUserRequestDto } from "./dtos/users.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrismaExceptionFilter } from "src/share/filters/unique-constraint.filter";

@ApiTags('users')
@UseFilters(PrismaExceptionFilter)
@Controller('users')
export class UserController {
     
     constructor(private readonly usersService: UsersService) { }
     
     @ApiOperation({ summary: 'Create a new user' })
     @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
     @ApiResponse({ status: 400, description: 'Bad Request.' })
     @ApiResponse({ status: 409, description: 'Unique constraint violation.' })
     @Post()
     async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserRequestDto): Promise<Users> {
          
          return this.usersService.createUser(createUserDto);
     }
}