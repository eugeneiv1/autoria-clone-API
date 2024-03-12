import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { CurrencyTypeEnum } from './enums/currency-type.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { ImageEntity } from './image.entity';
import { BaseEntity } from './models/base.entity';
import { RegionEntity } from './region.entity';
import { ViewEntity } from './view.entity';

@Entity(TableNameEnum.ADVERTISEMENTS)
export class AdvertisementEntity extends BaseEntity {
  @Column('text')
  title: string;

  @Column('text')
  body: string;

  @Column('text')
  currency: CurrencyTypeEnum;

  @Column('text')
  price: number;

  @OneToOne(() => RegionEntity)
  region?: RegionEntity;

  @OneToMany(() => ViewEntity, (entity) => entity.advertisement)
  views?: ViewEntity[];

  @OneToMany(() => ImageEntity, (entity) => entity.advertisement)
  images?: ImageEntity[];
}
