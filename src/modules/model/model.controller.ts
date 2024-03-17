import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddNewItemsRequestDto } from '../../common/dto/add-new-items.request.dto';
import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { ModelEntity } from '../../database/entities/model.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserRoleGuard } from '../user/guards/user-role.guard';
import { ModelListResponseDto } from './dto/response/model-list.response.dto';
import { ModelService } from './services/model.service';

@ApiTags('Models')
@Controller('models')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly addNewItems: AddNewItemsHelper,
  ) {}

  @SkipAuth()
  @Get()
  public async getAllModels(): Promise<ModelListResponseDto> {
    return await this.modelService.getAllModels();
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN, EUserRole.MODERATOR)
  @Post('add-brands')
  public async addModel(@Body() dto: AddNewItemsRequestDto): Promise<void> {
    return await this.addNewItems.addNewItems(dto, ModelEntity);
  }
}

// a6081952-eff8-4060-87cc-9aa1683597da
