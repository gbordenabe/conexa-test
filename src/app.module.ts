import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';
import { MovieModule } from './movie/movie.module';
import { SeedModule } from './seed/seed.module';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(envs.dbConnectionString),
    MovieModule,
    SeedModule,
    SharedModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
