import { IsString, IsNotEmpty, IsBoolean, IsIn } from 'class-validator';
import { UserRoles } from 'src/share/enums/roles.enums';

export class CreateUserRequestDto {

     @IsString()
     @IsNotEmpty()
     email: string;

     @IsString()   
     name: string;

     @IsString()    
     lastname: string;

     @IsString()
     @IsNotEmpty()  
     @IsIn([UserRoles.User, UserRoles.Admin])
     role: UserRoles;

     @IsString()
     @IsNotEmpty()    
     password: string;
     
     @IsBoolean()
     active: boolean;  
}
