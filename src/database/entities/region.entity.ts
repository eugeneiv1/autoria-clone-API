import { Column, Entity, OneToMany } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.REGIONS)
export class RegionEntity extends BaseEntity {
  @Column('text')
  name: string;

  @OneToMany(() => AdvertisementEntity, (entity) => entity.region)
  advertisement?: AdvertisementEntity[];
}
