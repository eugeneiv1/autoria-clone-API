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

// AKIA2UC3DF2H5YPBMGKH access IeKZn8Sm4lBZAchYIbfSa6PeFKBz9qvaTMdBags5 secret
