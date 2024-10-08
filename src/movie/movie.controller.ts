import { Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiController } from 'src/decorators';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';

@ApiController('movie')
@ApiBearerAuth()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.movieService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.regular, ValidRoles.admin)
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
