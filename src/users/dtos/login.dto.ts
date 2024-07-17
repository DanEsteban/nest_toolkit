import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export class LoginUserRequestDto {
     @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
     @IsString()
     @IsNotEmpty()
     email: string;

     @ApiProperty({ example: 'password', description: 'the password of the user' })
     @IsString()
     @IsNotEmpty()    
     password: string;
     
}
