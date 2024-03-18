import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../../user/dto/request/user-list.request.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getUsersList(
    query: UserListRequestDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    const skip = +query.limit * (+query.page - 1);
    qb.leftJoinAndSelect('user.sent', 'sent', 'user.id = sent.recipient');
    qb.leftJoinAndSelect('user.inbox', 'inbox', 'user.id = inbox.author');

    qb.addOrderBy('user.created', 'DESC');
    qb.take(query.limit);
    qb.skip(skip);
    return await qb.getManyAndCount();
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user');

    qb.leftJoinAndSelect('user.sent', 'sent', 'user.id = sent.recipient');
    qb.leftJoinAndSelect('user.inbox', 'inbox', 'user.id = inbox.author');
    qb.leftJoinAndSelect(
      'user.advertisements',
      'advertisement',
      'user.id = advertisement.user_Id',
    );

    qb.where('user.id = :userId', { userId });

    return await qb.getOne();
  }
}
