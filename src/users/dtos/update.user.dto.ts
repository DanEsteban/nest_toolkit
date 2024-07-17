import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsIn, IsOptional } from 'class-validator';
import { UserRoles } from 'src/share/enums/roles.enums';

export class UpdateUserRequestDto {
     @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
     @IsOptional()
     email?: string;

     @ApiProperty({ example: 'Daniel', description: 'The name of the user' })
     @IsString() 
     @IsOptional()  
     name?: string;

     @ApiProperty({ example: 'Velasco', description: 'The lastname of the user' })
     @IsString()
     @IsOptional()    
     lastname?: string;

     @ApiProperty({ example: 'password', description: 'the password of the user' })
     @IsString()
     @IsNotEmpty() 
     @IsOptional()   
     password?: string;
     
     @ApiProperty({ example: true, description: 'if the user is active or no' })
     @IsBoolean()
     @IsOptional()
     active?: boolean;  
}
