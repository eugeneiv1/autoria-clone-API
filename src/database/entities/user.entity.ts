import { Column, Entity } from 'typeorm';

import { EAccountType } from './enums/account-type';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseEntity {
  @Column('text')
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { select: false, default: EAccountType.FREE })
  account_type: string;

  @Column('text', { select: false })
  roles: string[];
}
