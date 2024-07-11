import { PrismaService } from "src/share/services/prisma.service";
import { CreateUserRequestDto } from "./dtos/users.dto";

export class UsersService {
     constructor(
          private readonly _prismaService: PrismaService,
     ) {}
     
     async createUser(userRequest: CreateUserRequestDto){
          console.log(this._prismaService);
          const createdUser =
          await this._prismaService.client.users.create({
               data: userRequest
          })
          return createdUser;
     }
}
