import { RegionEntity } from '../../../database/entities/region.entity';
import { RegionResponseDto } from '../dto/response/region.response.dto';
import { RegionListResponseDto } from '../dto/response/region-list.response.dto';

export class RegionMapper {
  public static regionToResponse(
    regionEntity: RegionEntity,
  ): RegionResponseDto {
    return {
      name: regionEntity.name,
    };
  }

  public static regionListToResponse(
    regionEntities: RegionEntity[],
  ): RegionListResponseDto {
    return {
      data: regionEntities.map(this.regionToResponse),
    };
  }
}
