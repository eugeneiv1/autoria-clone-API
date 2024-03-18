import { IPrices } from '../../interfaces/price.interface';

export class AdvertisementResponseDto {
  title: string;

  body: string;

  initialCurrency: string;

  initialPrice: number;

  user?: string;

  region?: string;

  brand?: string;

  model?: string;

  prices: IPrices;
}
