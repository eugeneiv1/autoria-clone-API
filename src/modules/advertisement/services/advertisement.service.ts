import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { EAccountType } from '../../../database/entities/enums/account-type';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CurrencyService } from '../../currency/services/currency.service';
import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { EUserRole } from '../../user/enums/user-role.enum';
import { CreateAdvertisementRequestDto } from '../dto/request/create-advertisement.request.dto';
import { AdvertisementResponseDto } from '../dto/response/advertisement.response.dto';
import { CurrencyEnum } from '../enums/currency.enum';
import { AdvertisementMapper } from './advertisement.mapper';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly advertisementRepository: AdvertisementRepository,
    private readonly userRepository: UserRepository,
    private readonly currencyService: CurrencyService,
    private readonly viewRepository: ViewRepository,
  ) {}

  public async getAdvertisementById(
    advertisementId: string,
  ): Promise<AdvertisementResponseDto> {
    const advertisement =
      await this.advertisementRepository.getById(advertisementId);
    const prices = await this.calcPrices(
      +advertisement.initialPrice,
      advertisement.initialCurrency,
    );

    await this.viewRepository.save(
      this.viewRepository.create({
        advertisement_id: advertisementId,
      }),
    );

    return AdvertisementMapper.advertisementToResponse(advertisement, prices);
  }

  // public async getAdvertisementFullInfo(
  //   advertisementId: string,
  //   query: AdvertisementRequestDto,
  // ) {
  //   const advertisement =
  //     await this.advertisementRepository.getAdvertisementFullInfo(
  //       advertisementId,
  //       query,
  //     );
  //
  //   const advertisementsByQuery = await this.advertisementRepository.getByQuery(
  //     query,
  //     advertisement.model_Id,
  //   );
  //   // console.log(advertisementsByQuery);
  //   const averageUkraine =
  //     await this.advertisementRepository.getAverageUkraine();
  //   console.log(averageUkraine);
  //   const prices = await this.calcPrices(
  //     +advertisement.initialPrice,
  //     advertisement.initialCurrency,
  //   );
  //
  //   return AdvertisementMapper.advertisementPremiumToResponse(
  //     advertisement,
  //     prices,
  //   );
  // }

  private async calcPrices(initialPrice: number, initialCurrency: string) {
    const exchangeEUR = this.currencyService.getEurRate();
    const exchangeUSD = this.currencyService.getUsdRate();
    let priceUah: number, priceUsd: number, priceEur: number;

    switch (initialCurrency) {
      case CurrencyEnum.UAH:
        priceEur = initialPrice / +exchangeEUR.buy;
        priceUsd = initialPrice / +exchangeUSD.buy;
        return {
          priceEur,
          priceUsd,
          exchangeUsd: exchangeUSD.buy,
          exchangeEur: exchangeEUR.buy,
        };
      case CurrencyEnum.ERU:
        priceUah = initialPrice * +exchangeEUR.sale;
        priceUsd = priceUah / +exchangeUSD.buy;
        return {
          priceUah,
          priceUsd,
          exchangeUsd: exchangeUSD.buy,
          exchangeEur: exchangeEUR.sale,
        };
      case CurrencyEnum.USD:
        priceUah = initialPrice * +exchangeUSD.sale;
        priceEur = priceUah / +exchangeEUR.buy;
        return {
          priceUah,
          priceEur,
          exchangeUsd: exchangeUSD.sale,
          exchangeEur: exchangeEUR.buy,
        };
    }
  }

  public async createAdvertisement(
    dto: CreateAdvertisementRequestDto,
    userData: IUserData,
  ): Promise<void> {
    if (userData.userId !== dto.user_Id) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.getUserById(userData.userId);
    if (
      user.advertisements.length >= 1 &&
      user.account_type === EAccountType.FREE
    ) {
      throw new ForbiddenException(
        'Buy premium to post more than 1 advertisement',
      );
    }

    await this.advertisementRepository.save(
      this.advertisementRepository.create({
        title: dto.title,
        body: dto.body,
        initialCurrency: dto.currency,
        initialPrice: dto.price,
        user_Id: userData.userId,
        region_Id: dto.region_Id,
        brand_Id: dto.brand_Id,
        model_Id: dto.model_Id,
      }),
    );
  }

  public async deleteById(
    advertisementId: string,
    userData: IUserData,
  ): Promise<void> {
    const isAdminOrModerator =
      userData.roles.includes(EUserRole.ADMIN) ||
      userData.roles.includes(EUserRole.MODERATOR);
    const advertisement = await this.advertisementRepository.findOneBy({
      id: advertisementId,
    });
    if (!advertisement) {
      throw new UnprocessableEntityException();
    }

    if (advertisement.user_Id !== userData.userId) {
      if (!isAdminOrModerator) {
        throw new ForbiddenException();
      }
    }

    await this.advertisementRepository.delete({ id: advertisementId });
  }
}
