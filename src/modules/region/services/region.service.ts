import { Injectable } from '@nestjs/common';

import { RegionRepository } from '../../repository/services/region.repository';
import { RegionListResponseDto } from '../dto/response/region-list.response.dto';
import { RegionMapper } from './region.mapper';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}
  public async getAllRegions(): Promise<RegionListResponseDto> {
    return RegionMapper.regionListToResponse(
      await this.regionRepository.find({}),
    );
  }
}
