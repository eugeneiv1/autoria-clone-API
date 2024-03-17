import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ModelEntity } from '../../../database/entities/model.entity';

@Injectable()
export class ModelRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }

  public async getAll(): Promise<ModelEntity[]> {
    const qb = this.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.brand', 'brand');
    return await qb.getMany();
  }
}
