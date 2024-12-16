import { Test, TestingModule } from '@nestjs/testing';
import { MockUsersService } from '@src/user/services/mock-user.service';
import { UserService } from '@src/user/services/user.service';
import { UserEntity } from '@src/user/models/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let usersService: UserService;
  let userRepository: Repository<UserEntity>;

  const mockUserRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        }
      ],
    }).compile();

    usersService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

});
