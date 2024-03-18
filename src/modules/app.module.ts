import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import configuration from '../configs/config';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';
import { SuperUserSeedService } from './auth/services/super-user.seed.service';
import { BrandModule } from './brand/brand.module';
import { CurrencyModule } from './currency/currency.module';
import { HealthModule } from './health/health.module';
import { ModelModule } from './model/model.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RegionModule } from './region/region.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RepositoryModule,
    HealthModule,
    PostgresModule,
    RedisModule,
    CurrencyModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    BrandModule,
    RegionModule,
    ModelModule,
    AdvertisementModule,
  ],
  controllers: [],
  providers: [SuperUserSeedService],
})
export class AppModule {}

// AKIA2UC3DF2H5YPBMGKH access IeKZn8Sm4lBZAchYIbfSa6PeFKBz9qvaTMdBags5 secret
