import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Movie } from '../schemas';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { find } from 'rxjs';

describe('MovieService', () => {
  let movieService: MovieService;
  let model: Model<Movie>;

  const mockMovie = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war.',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
  };

  const mockMovieService = {
    findOne: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieService,
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    model = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  describe('findOne', () => {
    it('should find and return a book by episode id', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockMovie);

      const result = await movieService.findOne(mockMovie.episode_id);

      expect(model.findOne).toHaveBeenCalledWith({
        episode_id: mockMovie.episode_id,
      });
      expect(result).toEqual(mockMovie);
    });

    it('should throw an error Bad Request if movie not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      try {
        await movieService.findOne(mockMovie.episode_id);
      } catch (error) {
        expect(error.message).toEqual('Movie not found');
        expect(error.status).toEqual(400);
      }
    });

    it('should throw an error Internal Server Error', async () => {
      jest.spyOn(model, 'findOne').mockRejectedValue(new Error());

      try {
        await movieService.findOne(mockMovie.episode_id);
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });

  describe('create', () => {
    it('should return InternalServerErrorException if something went wrong', async () => {
      jest.spyOn(model, 'create').mockRejectedValue(new Error());

      try {
        await movieService.create(mockMovie);
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });

  describe('createBulk', () => {
    it('should return InternalServerErrorException if something went wrong', async () => {
      jest.spyOn(model, 'insertMany').mockRejectedValue(new Error());

      try {
        await movieService.createBulk([mockMovie]);
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });
});
