import { Module } from '@nestjs/common';

import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { ModelController } from './model.controller';
import { ModelService } from './services/model.service';

@Module({
  imports: [],
  controllers: [ModelController],
  providers: [ModelService, AddNewItemsHelper],
})
export class ModelModule {}
