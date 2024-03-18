import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ForbiddenWordsGuard } from '../../common/guards/forbidden-words.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateAdvertisementRequestDto } from './dto/request/create-advertisement.request.dto';
import { AdvertisementResponseDto } from './dto/response/advertisement.response.dto';
import { AdvertisementService } from './services/advertisement.service';

@ApiTags('Advertisement')
@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}
  @SkipAuth()
  @Get()
  public async getAdvertisementList() {}

  @SkipAuth()
  @Get(':advertisementId')
  public async getAdvertisementById(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  ): Promise<AdvertisementResponseDto> {
    return await this.advertisementService.getAdvertisementById(
      advertisementId,
    );
  }

  // @SkipAuth()
  // @Get(':advertisementId/full')
  // public async getAdvertisementFullInfo(
  //   @Query('query') query: AdvertisementRequestDto,
  //   @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  // ) {
  //   return await this.advertisementService.getAdvertisementFullInfo(
  //     advertisementId,
  //     query,
  //   );
  // }

  @ApiBearerAuth()
  @UseGuards(ForbiddenWordsGuard)
  @Post()
  public async createAdvertisement(
    @Body() dto: CreateAdvertisementRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.advertisementService.createAdvertisement(dto, userData);
  }

  @Put(':advertisementId')
  public async editAdvertisement(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
  ) {}

  @ApiBearerAuth()
  @Delete(':advertisementId')
  public async deleteAdvertisement(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.advertisementService.deleteById(advertisementId, userData);
  }
}
