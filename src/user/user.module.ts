import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MockUsersService } from './services/mock-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity.js';
import { UserService } from './services/user.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'CRUDServiceInterface',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
