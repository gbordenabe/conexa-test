import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Logger } from '@nestjs/common';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}
