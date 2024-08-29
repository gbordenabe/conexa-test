import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/config/constants';

export class RegisterDto {
  @ApiProperty({ example: 'prueba@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'guest' })
  @IsString()
  @IsOptional()
  role?: Role;
}
