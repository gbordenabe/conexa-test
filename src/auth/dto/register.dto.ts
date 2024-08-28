import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/config/constants';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
