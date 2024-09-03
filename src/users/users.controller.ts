import { Body, Controller, HttpCode, Param, Post, Put, Delete, UseFilters, ValidationPipe, Get, UseGuards } from "@nestjs/common";
import { Users } from '@prisma/client';
import { UsersService } from "./users.service";
import { CreateUserRequestDto } from "./dtos/create.users.dto";
import { UpdateUserRequestDto } from "./dtos/update.users.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrismaExceptionFilter } from "src/share/filters/unique-constraint.filter";
import { LoginUserRequestDto } from "./dtos/login.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('users')
@UseFilters(PrismaExceptionFilter)
@Controller('users')
export class UserController {
     
     constructor(private readonly usersService: UsersService) { }
     
     @UseGuards(AuthGuard('jwt'))
     @ApiOperation({ summary: 'Show User' })
     @HttpCode(200)
     @ApiResponse({ status: 200, description: 'Successfully' })
     @Get(':id')
     async findOneUser(@Param('id') id: string){  
          return this.usersService.getOneUser(Number(id));
     }
     
     @UseGuards(AuthGuard('jwt'))
     @ApiOperation({ summary: 'Show Users' })
     @HttpCode(200)
     @ApiResponse({ status: 200, description: 'Successfully' })
     @Get()
     async getAllUser(){  
          return this.usersService.getAllUser();
     }

     @ApiOperation({ summary: 'Create a new user' })
     @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
     @ApiResponse({ status: 400, description: 'Bad Request.' })
     @ApiResponse({ status: 409, description: 'Unique constraint violation.' })
     @Post()
     async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserRequestDto): Promise<Users> {
          
          return this.usersService.createUser(createUserDto);
     }

     @ApiOperation({ summary: 'Login User' })
     @HttpCode(200)
     @ApiResponse({ status: 200, description: 'Login Successfull' })
     @ApiResponse({ status: 401, description: 'Not authorized' })
     @Post("/login")
     async loginUser(@Body(new ValidationPipe()) loginUserDto: LoginUserRequestDto): Promise<Partial<Users>> {
          
          return this.usersService.loginUser(loginUserDto);
     }

     @UseGuards(AuthGuard('jwt'))
     @ApiOperation({ summary: 'Update User' })
     @HttpCode(200)
     @ApiResponse({ status: 200, description: 'Update Successfully' })
     @ApiResponse({ status: 404, description: 'User not found' })
     @ApiResponse({ status: 400, description: 'Validation failed' })
     @Put(":id")
     async updateUser(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserRequestDto): Promise<Users> {
          const userId = parseInt(id);
          return this.usersService.updateUser(userId, updateUserDto);
     }

     @UseGuards(AuthGuard('jwt'))
     @Delete(":id")
     async deleUser(@Param('id') id: string): Promise<Users>{
          return this.usersService.deleteUser(Number(id))
     }
}