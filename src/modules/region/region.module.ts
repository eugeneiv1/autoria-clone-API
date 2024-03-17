import { Module } from '@nestjs/common';

import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { RegionController } from './region.controller';
import { RegionService } from './services/region.service';

@Module({
  imports: [],
  controllers: [RegionController],
  providers: [RegionService, AddNewItemsHelper],
})
export class RegionModule {}
