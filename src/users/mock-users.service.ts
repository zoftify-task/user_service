import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface.js';
import { CRUDServiceInterface } from './interfaces/crud-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class MockUsersService implements CRUDServiceInterface {

  private users: Map<number, User> = new Map();
  private emailIndex: Map<string, User> = new Map();

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findOne(id: number): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.validateUniqueEmail(createUserDto.email);
    const id: number = this.users.size;
    const user: User = { id, ...createUserDto }
    this.addUser(user);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.validateUniqueEmail(updateUserDto.email, id);
    const user: User = this.users.get(id);
    const updatedUser: User = { ...user, ...updateUserDto };
    this.addUser(user);
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    if (!this.users.delete(id)) {
      throw new NotFoundException('User')
    }
  }

  private validateUniqueEmail(email: string, id?: number) {
    const user = this.emailIndex.get(email);
    if (user && user.id !== id) {
      throw new BadRequestException(`User with email '${email} already exists`)
    }
  }

  private addUser(user: User): void {
    this.users.set(user.id, user);
    this.emailIndex.set(user.email, user);
  }
}


