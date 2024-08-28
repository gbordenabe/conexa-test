import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  episode_id: string;

  @IsString()
  @IsOptional()
  opening_crawl?: string;

  @IsString()
  @IsOptional()
  director?: string;

  @IsString()
  @IsOptional()
  ucer?: string;

  @IsString()
  @IsOptional()
  release_date?: string;
}
