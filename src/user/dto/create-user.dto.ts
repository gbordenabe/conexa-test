import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Logger } from '@nestjs/common';
import { Role } from 'src/config/constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
