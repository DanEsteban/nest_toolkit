import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/share/services/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY_PUBLIC, // Replace with your own secret
      //signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
