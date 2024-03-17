import { Injectable } from '@nestjs/common';

import { BrandRepository } from '../../repository/services/brand.repository';
import { BrandListResponseDto } from '../dto/response/brand-list.response.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async getAllBrands(): Promise<BrandListResponseDto> {
    return BrandMapper.brandListToResponse(await this.brandRepository.find({}));
  }
  // public async addBrand(dto: BrandRequestDto): Promise<void> {
  //   const brandEntities = await this.brandRepository.findBy({
  //     brand: In(dto.brand),
  //   });
  //   const brandNamesInDB = new Set(brandEntities.map(({ brand }) => brand));
  //   const newBrandNames = dto.brand.filter(
  //     (brand) => !brandNamesInDB.has(brand),
  //   );
  //
  //   await this.brandRepository.save(
  //     newBrandNames.map((brand) => this.brandRepository.create({ brand })),
  //   );
  // }
}
