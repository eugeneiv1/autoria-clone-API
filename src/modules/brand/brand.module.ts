import { Module } from '@nestjs/common';

import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { BrandController } from './brand.controller';
import { BrandService } from './services/brand.service';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, AddNewItemsHelper],
})
export class BrandModule {}
