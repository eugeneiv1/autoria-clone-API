import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.MODELS)
export class ModelEntity extends BaseEntity {
  @Column('text')
  name: string;

  @OneToMany(() => AdvertisementEntity, (entity) => entity.brand)
  advertisements?: AdvertisementEntity[];

  @Column()
  related_Id: string;
  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: 'related_Id' })
  brand?: BrandEntity;
}
