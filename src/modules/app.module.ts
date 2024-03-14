import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { AuthModule } from './auth/auth.module';
import { SuperUserSeedService } from './auth/services/super-user.seed.service';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RepositoryModule,
    HealthModule,
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [SuperUserSeedService],
})
export class AppModule {}

// AKIA2UC3DF2H5YPBMGKH access IeKZn8Sm4lBZAchYIbfSa6PeFKBz9qvaTMdBags5 secret
