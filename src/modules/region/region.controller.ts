import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddNewItemsRequestDto } from '../../common/dto/add-new-items.request.dto';
import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { RegionEntity } from '../../database/entities/region.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserRoleGuard } from '../user/guards/user-role.guard';
import { RegionListResponseDto } from './dto/response/region-list.response.dto';
import { RegionService } from './services/region.service';

@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(
    private readonly regionService: RegionService,
    private readonly addNewItems: AddNewItemsHelper,
  ) {}

  @SkipAuth()
  @Get()
  public async getAllRegions(): Promise<RegionListResponseDto> {
    return await this.regionService.getAllRegions();
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN, EUserRole.MODERATOR)
  @Post('add-brands')
  public async addRegion(@Body() dto: AddNewItemsRequestDto): Promise<void> {
    return await this.addNewItems.addNewItems(dto, RegionEntity);
  }
}
