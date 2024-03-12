import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
