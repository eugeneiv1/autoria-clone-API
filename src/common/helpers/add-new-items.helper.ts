import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { AddNewItemsRequestDto } from '../dto/add-new-items.request.dto';

@Injectable()
export class AddNewItemsHelper {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  // This method can be used ONLY when Entity has 1 property "name" and optional property "id" of related table
  public async addNewItems(dto: AddNewItemsRequestDto, entity) {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const entityRepository = em.getRepository(entity);

      const entities = await entityRepository.findBy({
        name: In(dto.names),
      });
      const brandNamesInDB = new Set(entities.map(({ brand }) => brand));
      const newBrandNames = dto.names.filter(
        (name) => !brandNamesInDB.has(name),
      );

      await entityRepository.save(
        newBrandNames.map((name) =>
          dto.id
            ? entityRepository.create({ name, related_Id: dto.id })
            : entityRepository.create({ name }),
        ),
      );
    });
  }
}
