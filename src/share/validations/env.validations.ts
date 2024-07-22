import { IsNotEmpty, IsString } from "class-validator";

export class EnvironmentVariables {
     @IsString()
     @IsNotEmpty()
     DATABASE_URL: string;

     @IsString()
     @IsNotEmpty()
     FRONTEND_URL: string;

     @IsString()
     @IsNotEmpty()
     FRONTEND_METHODS: string;
}
