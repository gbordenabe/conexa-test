import { Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiController } from 'src/decorators';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiController('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  seed() {
    return this.seedService.runSeed();
  }
}
