import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsIn, IsOptional } from 'class-validator';
import { UserRoles } from 'src/share/enums/roles.enums';

export class CreateUserRequestDto {
     @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
     @IsString()
     @IsNotEmpty()
     email: string;

     @ApiProperty({ example: 'Daniel', description: 'The name of the user' })
     @IsString()   
     @IsOptional()   
     name?: string;

     @ApiProperty({ example: 'Velasco', description: 'The lastname of the user' })
     @IsString()
     @IsOptional()       
     lastname?: string;

     @ApiProperty({ example: 'USER or ADMIN', description: 'The role of the user' })
     @IsString()
     @IsNotEmpty()  
     @IsIn([UserRoles.User, UserRoles.Admin])
     role: UserRoles;

     @ApiProperty({ example: 'password', description: 'the password of the user' })
     @IsString()
     @IsNotEmpty()    
     password: string;
     
     @ApiProperty({ example: true, description: 'if the user is active or no' })
     @IsBoolean()
     active: boolean;
     
     @IsString()
     @IsOptional()   
     tokens?: string;
     
}
