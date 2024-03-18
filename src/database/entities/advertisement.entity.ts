import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ImageEntity } from './image.entity';
import { ModelEntity } from './model.entity';
import { BaseEntity } from './models/base.entity';
import { RegionEntity } from './region.entity';
import { UserEntity } from './user.entity';
import { ViewEntity } from './view.entity';

@Entity(TableNameEnum.ADVERTISEMENTS)
export class AdvertisementEntity extends BaseEntity {
  @Column('text')
  title: string;

  @Column('text')
  body: string;

  @Column('text')
  initialCurrency: string;

  @Column('text')
  initialPrice: number;

  @OneToMany(() => ViewEntity, (entity) => entity.advertisement)
  views?: ViewEntity[];

  @OneToMany(() => ImageEntity, (entity) => entity.advertisement)
  images?: ImageEntity[];

  @Column()
  user_Id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'user_Id' })
  user?: UserEntity;

  @Column()
  region_Id: string;
  @ManyToOne(() => RegionEntity, (entity) => entity.advertisement)
  @JoinColumn({ name: 'region_Id' })
  region?: RegionEntity;

  @Column()
  brand_Id: string;
  @ManyToOne(() => BrandEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'brand_Id' })
  brand?: BrandEntity;

  @Column()
  model_Id: string;
  @ManyToOne(() => ModelEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'model_Id' })
  model?: BrandEntity;
}
