import { Column, Entity, OneToMany } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { EAccountType } from './enums/account-type';
import { TableNameEnum } from './enums/table-name.enum';
import { MessageEntity } from './message.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

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

  @Column('text', { default: ['free'] })
  roles: string[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.user)
  advertisements?: AdvertisementEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => MessageEntity, (entity) => entity.author)
  inbox?: MessageEntity[];

  @OneToMany(() => MessageEntity, (entity) => entity.recipient)
  sent?: MessageEntity[];
}
