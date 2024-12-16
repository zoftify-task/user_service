import { Test, TestingModule } from '@nestjs/testing';
import { MockUsersService } from '@src/user/services/mock-user.service';
import { UserService } from '@src/user/services/user.service';
import { UserEntity } from '@src/user/models/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/user.interface.js';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { rejects } from 'assert';

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const mockUserRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn().mockImplementation((CreateUserDto) => { }),
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

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe("findAll", () => {
    const findAllTest = async (result: User[]) => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);
      expect(await userService.findAll()).toEqual(result);
    }

    const result: User[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Sarah Rexu', email: 'sarah.rexu@example.com' },
      { id: 3, name: 'Reginald Jeeves', email: 'reginald.jeeves@example.com' },
    ];

    it('should return an empty array if no users are found', findAllTest.bind(null, []));
    it('should return an array of users', findAllTest.bind(null, result))
  })

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user: User = { id: 1, name: 'Ye Wenjie', email: 'ye.wenjie@example.com' };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      expect(await userService.findOne(user.id)).toEqual(user);
    })

    it('should throw a NotFoundExeption', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      expect(userService.findOne(1)).rejects.toThrow(NotFoundException);
    })
  })

  describe('create', () => {
    it('should create and return a new user', async () => {
      const dto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com' };
      const user: User = { id: 1, ...dto };

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      expect(await userService.create(dto)).toEqual(user);
    });

    it('should throw an error if user with the same email already exists', async () => {
      const dto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com' };
      const existingUser: User = { id: 1, ...dto };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);
      expect(userService.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const dto = { name: 'Updated Name' };
      const existingUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
      const updatedUser = { id: 1, name: 'Updated Name', email: 'updated.name@example.com' };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(existingUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(updatedUser);

      expect(await userService.update(existingUser.id, dto)).toEqual(updatedUser);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      expect(userService.update(1, { name: 'Updated Name' })).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if user with the same email already exists', async () => {
      const dto = { name: 'Updated Name', email: 'john.doe@example.com' };
      const existingUser = { id: 2, name: 'John Doe', email: 'john.doe@example.com' };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);
      expect(userService.update(1, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      expect(userService.remove(1)).resolves.toBeUndefined();
    });

  });
})
