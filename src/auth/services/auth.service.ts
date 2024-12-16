import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthUserEntity } from '../models/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly userRepository: Repository<AuthUserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthUserEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUserEntity | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateToken(user: AuthUserEntity): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
