import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingAdapterService } from './hashing-adapter.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtAuthService } from './jwt-auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashingAdapterService, JwtAuthService],
})
export class AuthModule {}
