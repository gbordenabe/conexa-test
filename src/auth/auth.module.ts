import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingAdapterService } from './hashing-adapter.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashingAdapterService],
})
export class AuthModule {}
