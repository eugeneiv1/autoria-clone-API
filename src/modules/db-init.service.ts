import { Injectable, OnModuleInit } from '@nestjs/common';

import { AddNewItemsHelper } from '../common/helpers/add-new-items.helper';
import { BrandEntity } from '../database/entities/brand.entity';
import { RegionEntity } from '../database/entities/region.entity';

@Injectable()
export class DbInitService implements OnModuleInit {
  constructor(private readonly addNewItems: AddNewItemsHelper) {}
  async onModuleInit(): Promise<void> {
    const baseBrands = ['Subaru', 'Chevrolet', 'Ford'];
    const baseRegions = ['Kyiv', 'Lviv', 'Rivne', 'Kharkiv'];
    await this.addNewItems.addNewItems({ names: baseBrands }, BrandEntity);
    await this.addNewItems.addNewItems({ names: baseRegions }, RegionEntity);
  }
}
