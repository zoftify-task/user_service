import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { AuthUser } from './user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
    private readonly jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto): Promise<AuthUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateToken(user: AuthUser): Promise<string> {
    const payload = { sub: user.id, email: user.email }
    return this.jwtService.sign(payload);
  }
}
