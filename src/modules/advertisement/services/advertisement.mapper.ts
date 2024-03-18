import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementResponseDto } from '../dto/response/advertisement.response.dto';
import { AdvertisementPremiumResponseDto } from '../dto/response/advertisement-premium.response.dto';
import { IPrices } from '../interfaces/price.interface';

export class AdvertisementMapper {
  public static advertisementToResponse(
    advertisement: AdvertisementEntity,
    prices: IPrices,
  ): AdvertisementResponseDto {
    return {
      title: advertisement.title,
      body: advertisement.body,
      initialCurrency: advertisement.initialCurrency,
      initialPrice: advertisement.initialPrice,
      user: advertisement.user_Id,
      region: advertisement.region_Id,
      brand: advertisement.brand_Id,
      model: advertisement.model_Id,
      prices: { ...prices },
    };
  }

  public static advertisementPremiumToResponse(
    advertisement: AdvertisementEntity,
    prices: IPrices,
  ): AdvertisementPremiumResponseDto {
    return {
      title: advertisement.title,
      body: advertisement.body,
      initialCurrency: advertisement.initialCurrency,
      initialPrice: advertisement.initialPrice,
      user: advertisement.user_Id,
      region: advertisement.region_Id,
      brand: advertisement.brand_Id,
      model: advertisement.model_Id,
      views: advertisement.views.length,
      prices: { ...prices },
    };
  }
}
