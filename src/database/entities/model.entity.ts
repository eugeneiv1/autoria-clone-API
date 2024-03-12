import { Column, Entity } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.MODELS)
export class ModelEntity extends BaseEntity {
  @Column('text')
  model: string;
}
