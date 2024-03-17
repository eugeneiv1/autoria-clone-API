import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddNewItemsRequestDto } from '../../common/dto/add-new-items.request.dto';
import { AddNewItemsHelper } from '../../common/helpers/add-new-items.helper';
import { BrandEntity } from '../../database/entities/brand.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { EUserRole } from '../user/enums/user-role.enum';
import { UserRoleGuard } from '../user/guards/user-role.guard';
import { BrandListResponseDto } from './dto/response/brand-list.response.dto';
import { BrandService } from './services/brand.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly addNewItems: AddNewItemsHelper,
  ) {}

  @SkipAuth()
  @Get()
  public async getAllBrands(): Promise<BrandListResponseDto> {
    return await this.brandService.getAllBrands();
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN, EUserRole.MODERATOR)
  @Post('add-brands')
  public async addBrand(@Body() dto: AddNewItemsRequestDto): Promise<void> {
    return await this.addNewItems.addNewItems(dto, BrandEntity);
  }
}
