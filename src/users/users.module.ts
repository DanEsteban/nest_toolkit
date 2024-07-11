import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/share/services/prsma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
