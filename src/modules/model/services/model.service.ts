import { Injectable } from '@nestjs/common';

import { ModelRepository } from '../../repository/services/model.repository';
import { ModelListResponseDto } from '../dto/response/model-list.response.dto';
import { ModelMapper } from './model.mapper';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}
  public async getAllModels(): Promise<ModelListResponseDto> {
    return ModelMapper.regionListToResponse(
      await this.modelRepository.getAll(),
    );
  }
}
