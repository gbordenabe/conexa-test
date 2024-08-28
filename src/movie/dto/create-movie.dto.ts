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
  @IsOptional()
  episode_id: string;

  @IsString()
  @IsOptional()
  opening_crawl: string;

  @IsString()
  @IsOptional()
  director: string;

  @IsString()
  @IsOptional()
  ucer: string;

  @IsString()
  @IsOptional()
  release_date: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  characters: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planets: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  starships: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  species: string[];
}
