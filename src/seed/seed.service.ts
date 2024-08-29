import { Injectable } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth/auth.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ValidRoles } from 'src/auth/interfaces';
import { HttpAdapterService } from 'src/shared/http-adapter.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
    private readonly httpAdapterService: HttpAdapterService,
  ) {}

  async runSeed() {
    await this.userService.removeAll();
    await this.movieService.removeAll();
    await this.authService.register({
      email: 'admin@email.com',
      password: '123456',
      role: ValidRoles.admin,
    });
    await this.authService.register({
      email: 'regular@email.com',
      password: '123456',
      role: ValidRoles.regular,
    });
    const movies = await this.httpAdapterService.get(
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
