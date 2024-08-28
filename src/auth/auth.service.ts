import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingAdapterService } from './hashing-adapter.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingAdapterService: HashingAdapterService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.userService.findOne(email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.hashingAdapterService.hash(password);

    return await this.userService.create({ email, password: hashedPassword });
  }
}
