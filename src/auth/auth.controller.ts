import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiController } from 'src/decorators';
import { RegisterDto } from 'src/dtos';

@ApiController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
