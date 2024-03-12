import { Column, Entity } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.REGIONS)
export class RegionEntity extends BaseEntity {
  @Column('text')
  region?: string;
}
