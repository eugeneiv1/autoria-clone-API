import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGES)
export class MessageEntity extends BaseEntity {
  @Column('text')
  body: string;

  @Column({ nullable: true })
  author_Id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.inbox)
  @JoinColumn({ name: 'author_Id' })
  recipient?: UserEntity;

  @Column({ nullable: true })
  recipient_Id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.sent)
  @JoinColumn({ name: 'recipient_Id' })
  author?: UserEntity;
}
