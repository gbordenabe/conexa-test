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

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
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

  async findAll() {
    try {
      const movies = await this.movieModel.find().exec();
      return movies.map((movie) => {
        return { title: movie.title, episode_id: movie.episode_id };
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(episode_id: number) {
    try {
      const movie = await this.checkIfMovieExists(episode_id);
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
      await this.checkIfMovieExists(episode_id);
      await this.movieModel.updateOne({ episode_id }, updateMovieDto);
      const movieUpdated = await this.movieModel.findOne({
        episode_id,
      });
      return movieUpdated;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException('Movie not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(episode_id: number) {
    try {
      const movie = await this.checkIfMovieExists(episode_id);
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

  async checkIfMovieExists(episode_id: number) {
    const movie = await this.movieModel.findOne({
      episode_id,
    });
    if (!movie) {
      throw new BadRequestException();
    }
    return movie;
  }
}
