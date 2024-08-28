import { Injectable } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpFetchService } from 'src/shared/http-fetch.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
    private readonly httpFetchService: HttpFetchService,
  ) {}

  async runSeed() {
    await this.userService.removeAll();
    await this.movieService.removeAll();
    await this.authService.register({
      email: 'admin@email.com',
      password: 'admin',
      role: 'admin',
    });
    await this.authService.register({
      email: 'regular@email.com',
      password: 'regular',
      role: 'regular',
    });
    const movies = await this.httpFetchService.get(
      'https://swapi.dev/api/films',
    );
    await this.movieService.createBulk(movies.results);
    return 'Seed completed';
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async autoRunSeed() {
    await this.runSeed();
  }
}
