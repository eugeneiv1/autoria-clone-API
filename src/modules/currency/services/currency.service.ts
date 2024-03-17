import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly apiUrl =
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  private readonly currencyRates: Record<string, number> = {};

  @Cron('0 0 * * *')
  async updateCurrencyRates(): Promise<void> {
    try {
      const response = await axios.get(this.apiUrl);
      const rates = response.data.rates;
      this.currencyRates.usd = rates.find((r) => r.ccy === 'USD').rate;
      this.currencyRates.eur = rates.find((r) => r.ccy === 'EUR').rate;
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    }
  }

  getUsdRate(): number {
    return this.currencyRates.usd;
  }

  getEurRate(): number {
    return this.currencyRates.eur;
  }
}
