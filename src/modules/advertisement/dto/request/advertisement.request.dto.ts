import { IsOptional, IsUUID } from 'class-validator';

export class AdvertisementRequestDto {
  @IsOptional()
  @IsUUID()
  region?: string;
}
