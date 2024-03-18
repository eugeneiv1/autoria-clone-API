import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementRequestDto } from '../../advertisement/dto/request/advertisement.request.dto';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  public async getById(id: string) {
    const qb = this.createQueryBuilder('advertisement');

    qb.where('advertisement.id = :id', { id });

    return await qb.getOne();
  }

  public async getAdvertisementFullInfo(
    id: string,
    query: AdvertisementRequestDto,
  ) {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.views', 'view');
    qb.where('advertisement.id = :id', { id });
    return await qb.getOne();
  }

  // public async getByQuery(query: AdvertisementRequestDto, model_Id: string) {
  //   const qb = this.createQueryBuilder('advertisement');
  //   qb.setParameter('model', model_Id);
  //
  //   if (query.region) {
  //     qb.andWhere('CONCAT(LOWER(advertisement.region)) LIKE :region');
  //     qb.setParameter('region', query.region);
  //   }
  //   qb.setParameter('model', model_Id);
  //   qb.andWhere('CONCAT(advertisement.model) LIKE :model');
  //
  //   return await qb.getMany();
  // }
  //
  // public async getAverageUkraine() {
  //   const qb = this.createQueryBuilder('advertisement');
  //   qb.addSelect(
  //     'AVG(CAST(advertisement.initialPrice AS NUMERIC)) OVER()',
  //     'averagePriceUkraine',
  //   );
  //   qb.groupBy('advertisement.id');
  //   return await qb.getRawOne();
  // }
}
