import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly apiUrl =
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  private readonly currencyRates: Record<string, any> = {};
  async onModuleInit() {
    await this.updateCurrencyRates();
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateCurrencyRates(): Promise<void> {
    try {
      const response = await axios.get(this.apiUrl);
      const rates = response.data;
      this.currencyRates.usd = rates.find((r) => r.ccy === 'USD');
      this.currencyRates.eur = rates.find((r) => r.ccy === 'EUR');
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    }
  }

  getUsdRate() {
    return this.currencyRates.usd;
  }

  getEurRate() {
    return this.currencyRates.eur;
  }
}
