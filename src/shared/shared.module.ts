import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpFetchService } from './http-fetch.service';
import { HashingAdapterService } from './hashing-adapter.service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [HttpFetchService, HashingAdapterService, JwtAuthService],
  exports: [HttpFetchService, HashingAdapterService, JwtAuthService],
})
export class SharedModule {}
