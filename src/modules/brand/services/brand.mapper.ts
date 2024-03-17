import { BrandEntity } from '../../../database/entities/brand.entity';
import { BrandResponseDto } from '../dto/response/brand.response.dto';
import { BrandListResponseDto } from '../dto/response/brand-list.response.dto';

export class BrandMapper {
  public static brandToResponse(brandEntity: BrandEntity): BrandResponseDto {
    return {
      brand: brandEntity.name,
    };
  }

  public static brandListToResponse(
    brandEntities: BrandEntity[],
  ): BrandListResponseDto {
    return {
      data: brandEntities.map(this.brandToResponse),
    };
  }
}
