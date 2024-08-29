import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Title test of Movie' })
  @IsString()
  title: string;

  @ApiProperty({ example: 333 })
  @IsNumber()
  @IsPositive()
  episode_id: number;

  @ApiPropertyOptional({ example: 'It is a period of civil war.' })
  @IsString()
  @IsOptional()
  opening_crawl?: string;

  @ApiPropertyOptional({ example: 'George Lucas' })
  @IsString()
  @IsOptional()
  director?: string;

  @ApiPropertyOptional({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  @IsOptional()
  producer?: string;

  @ApiPropertyOptional({ example: '1977-05-25' })
  @IsString()
  @IsOptional()
  release_date?: string;
}
