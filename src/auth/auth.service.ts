import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingAdapterService } from '../shared/hashing-adapter.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthService } from '../shared/jwt-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingAdapterService: HashingAdapterService,
    private readonly JwtAuthService: JwtAuthService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, role = 'guest' } = registerDto;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.hashingAdapterService.hash(password);
    return await this.userService.create({
      email,
      password: hashedPassword,
      role,
    });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this.hashingAdapterService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, role: user.role };
    const token = await this.JwtAuthService.generateToken(payload);

    return { token };
  }
}
