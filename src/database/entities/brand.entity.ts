import { Column, Entity } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity extends BaseEntity {
  @Column('text')
  brand: string;
}
