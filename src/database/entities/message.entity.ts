import { Column, Entity } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.MESSAGES)
export class MessageEntity extends BaseEntity {
  @Column('text')
  body: string;
}