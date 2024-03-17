import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';

@ApiTags('Advertisement')
@Controller('advertisements')
export class AdvertisementController {
  @SkipAuth()
  @Get()
  public async getAdvertisementList() {}

  @SkipAuth()
  @Get(':advertisementId')
  public async getAdvertisement(
    @Param(':advertisementId', ParseUUIDPipe) advertisementId: string,
  ) {}

  @Post()
  public async createAdvertisement() {}

  @Put(':advertisementId')
  public async editAdvertisement(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  ) {}

  @Delete(':advertisementId')
  public async deleteAdvertisement(
    @Param(':advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ) {}
}
