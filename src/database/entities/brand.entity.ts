import { Column, Entity, OneToMany } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity extends BaseEntity {
  @Column('text')
  brand: string;

  @OneToMany(() => AdvertisementEntity, (entity) => entity.brand)
  advertisements?: AdvertisementEntity[];

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity[];
}
