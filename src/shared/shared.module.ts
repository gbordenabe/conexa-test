import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpFetchService } from './http-fetch.service';

@Module({
  imports: [HttpModule],
  providers: [HttpFetchService],
  exports: [HttpFetchService],
})
export class SharedModule {}
