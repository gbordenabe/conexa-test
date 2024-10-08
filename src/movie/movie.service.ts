import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../schemas';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const existsEpisodeId = await this.checkIfMovieExistsByEpisodeId(
        createMovieDto.episode_id,
      );
      if (existsEpisodeId) {
        throw new BadRequestException('Movie episode_id already exists');
      }
      const existsTitle = await this.checkIfMovieExistsByTitle(
        createMovieDto.title,
      );
      if (existsTitle) {
        throw new BadRequestException('Movie title already exists');
      }
      const createdMovie = new this.movieModel(createMovieDto);
      return await createdMovie.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Movie title or episode_id already exists',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createBulk(createMovieDto: CreateMovieDto[]) {
    try {
      return await this.movieModel.insertMany(createMovieDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const [movies, total] = await Promise.all([
        this.movieModel.find().skip(offset).limit(limit).exec(),
        this.movieModel.countDocuments().exec(),
      ]);

      return {
        total,
        page: Math.floor(offset / limit) + 1,
        data: movies.map((movie) => ({
          title: movie.title,
          episode_id: movie.episode_id,
        })),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(episode_id: number) {
    try {
      const movie = await this.checkIfMovieExistsByEpisodeId(episode_id);
      return movie;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException('Movie not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(episode_id: number, updateMovieDto: UpdateMovieDto) {
    try {
      const movieUpdated = await this.movieModel.findOneAndUpdate(
        { episode_id },
        updateMovieDto,
        { new: true },
      );
      if (!movieUpdated) {
        throw new BadRequestException('Movie not found');
      }
      return movieUpdated;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(episode_id: number) {
    try {
      const movie = await this.checkIfMovieExistsByEpisodeId(episode_id);
      await this.movieModel.deleteOne({ episode_id }).exec();
      return { message: 'Movie deleted', movie };
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException('Movie not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async removeAll() {
    return await this.movieModel.deleteMany({}).exec();
  }

  async checkIfMovieExistsByEpisodeId(episode_id: number) {
    const movie = await this.movieModel.findOne({
      episode_id,
    });
    if (!movie) {
      throw new BadRequestException();
    }
    return movie;
  }

  async checkIfMovieExistsByTitle(title: string) {
    const movie = await this.movieModel.findOne({
      title,
    });
    if (!movie) {
      throw new BadRequestException();
    }
    return movie;
  }
}
