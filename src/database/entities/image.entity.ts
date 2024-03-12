import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.IMAGES)
export class ImageEntity extends BaseEntity {
  @Column('text')
  imageUrl: string;

  @Column('text')
  advertisement_id: string;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.images)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement?: string;
}
