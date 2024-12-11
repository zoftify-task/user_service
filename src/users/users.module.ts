import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MockUsersService } from './mock-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'CRUDServiceInterface',
      useClass: UsersService
    }
  ],
})
export class UsersModule { }
