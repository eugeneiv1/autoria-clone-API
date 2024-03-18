import { Module } from '@nestjs/common';

import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/services/currency.service';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  imports: [CurrencyModule],
  providers: [AdvertisementService, CurrencyService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
