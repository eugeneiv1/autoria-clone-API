import { ModelEntity } from '../../../database/entities/model.entity';
import { ModelResponseDto } from '../dto/response/model.response.dto';
import { ModelListResponseDto } from '../dto/response/model-list.response.dto';

export class ModelMapper {
  public static regionToResponse(modelEntity: ModelEntity): ModelResponseDto {
    return {
      name: modelEntity.name,
      brand: modelEntity.brand,
    };
  }

  public static regionListToResponse(
    modelEntities: ModelEntity[],
  ): ModelListResponseDto {
    return {
      data: modelEntities.map(this.regionToResponse),
    };
  }
}
