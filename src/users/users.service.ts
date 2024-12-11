import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CRUDServiceInterface } from "./interfaces/crud-service.interface.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class UsersService implements CRUDServiceInterface {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUniqueEmail(createUserDto.email);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.validateUniqueEmail(updateUserDto.email, id)
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateUniqueEmail(email: string, id?: number) {
    const user = await this.userRepository.findOneBy({ email });
    if (user && user.id !== id) {
      throw new BadRequestException(`User with email '${email}' already exists`);
    }
  }

}