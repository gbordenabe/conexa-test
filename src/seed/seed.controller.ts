import { Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiController } from 'src/decorators';

@ApiController('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  seed() {
    return this.seedService.runSeed();
  }
}
