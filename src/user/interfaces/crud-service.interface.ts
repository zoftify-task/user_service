import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { User } from '../models/user.interface.js';

export interface CRUDServiceInterface {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  remove(id: number): Promise<void>;
}
