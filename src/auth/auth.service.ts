import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.userService.findOne(email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
  }
}
