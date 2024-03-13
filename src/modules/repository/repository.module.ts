import { Global, Module } from '@nestjs/common';

import { AdvertisementRepository } from './services/advertisement.repository';
import { BrandRepository } from './services/brand.repository';
import { ImageRepository } from './services/image.repository';
import { MessageRepository } from './services/message.repository';
import { ModelRepository } from './services/model.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { RegionRepository } from './services/region.repository';
import { UserRepository } from './services/user.repository';
import { ViewRepository } from './services/view.repository';

const repositories = [
  ViewRepository,
  UserRepository,
  RegionRepository,
  RefreshTokenRepository,
  ModelRepository,
  MessageRepository,
  ImageRepository,
  BrandRepository,
  AdvertisementRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
