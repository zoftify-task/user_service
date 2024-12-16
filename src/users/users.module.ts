import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { MockUsersService } from './services/mock-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity.js';
import { UsersService } from './services/users.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'CRUDServiceInterface',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
