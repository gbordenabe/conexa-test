import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpAdapterService } from './http-adapter.service';
import { HashingAdapterService } from './hashing-adapter.service';

@Module({
  imports: [HttpModule],
  providers: [HttpAdapterService, HashingAdapterService],
  exports: [HttpAdapterService, HashingAdapterService],
})
export class SharedModule {}
